import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';
import Product from '../../../models/Product';
import { generateProductCode } from '@/src/lib/generateProductCode';
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { categories, products } = req.body;
     console.log("categories",categories);
     console.log("products",products);
        // Validate input
        if (!categories || !Array.isArray(categories)) {
            return res.status(400).json({ message: 'Categories array is required' });
        }

        const results = {
            categories: [],
            products: [],
            errors: []
        };

        // Process categories and their products
        for (const categoryData of categories) {
            try {
       

               if (categoryData._id) {
                const existingCategory = await Category.findById(categoryData._id);

                if (existingCategory) {
                results.errors.push({
                type: 'category',
                data: categoryData,
                error: `Category with ID "${categoryData._id}" already exists. Skipping creation.`,
                });
                continue;
                }
                }


                // Create category
                const category = new Category({
                name: categoryData.name,
                description: categoryData.description || '',
                catImage: categoryData.catImage ,  
                categoryType: categoryData.categoryType === "customcategory" ? "customcategory" : "homecategory",
                isActive: true
                });

                const savedCategory = await category.save();
                results.categories.push(savedCategory);


                const slugify = (text) => {
                    return text
                      .toString()                   // Ensure it's a string
                      .toLowerCase()                // Convert to lowercase
                      .trim()                       // Remove whitespace from both ends
                      .replace(/[\s\W-]+/g, '-')    // Replace spaces & non-word chars with dash
                      .replace(/^-+|-+$/g, '');     // Trim starting and ending dashes
                  };

                // Process products for this category
                if (products && products[categoryData.id] && Array.isArray(products[categoryData.id])) {
                    for (const productData of products[categoryData.id]) {
                        try {
                            // Handle images array
                            let imagesArr = productData.images || [];
                            if (productData.image) {
                                // Backward compatibility: single image
                                imagesArr = [productData.image];
                            }
                            // Create product
                            const product = new Product({
                                 name: productData.name,
                                 slug: slugify(productData.name),
                                skuid: await generateProductCode(),
                                price: parseFloat(productData.price),
                                quantity: parseInt(productData.quantity),
                                description: productData.description || '',
                                amazonLink: productData.amazonLink, 
                                flipkartLink: productData.flipkartLink, 
                                category: savedCategory._id,
                                images: imagesArr,
                                isActive: true
                            });

                            const savedProduct = await product.save();
                            results.products.push(savedProduct);

                            // Add product to category
                            savedCategory.products.push(savedProduct._id);
                            await savedCategory.save();

                        } catch (productError) {
                            results.errors.push({
                                type: 'product',
                                data: productData,
                                error: productError.message
                            });
                        }
                    }
                }

            } catch (categoryError) {
                // Handle duplicate key errors more gracefully
                if (categoryError.code === 11000) {
                    const field = Object.keys(categoryError.keyPattern)[0];
                    results.errors.push({
                        type: 'category',
                        data: categoryData,
                        error: `A category with this ${field} already exists. Please use a different ${field}.`
                    });
                } else {
                    results.errors.push({
                        type: 'category',
                        data: categoryData,
                        error: categoryError.message
                    });
                }
            }
        }

        return res.status(200).json({
            message: 'Categories and products processed successfully',
            results
        });

    } catch (error) {
        console.error('Error in addcatprod API:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
}
