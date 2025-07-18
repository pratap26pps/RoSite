 import connectDB from "@/src/lib/dbConnect";
 import Category from "@/src/models/Category";
import Product from "@/src/models/Product";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  
  await connectDB();

 const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};


  const { categoryId, products } = req.body;
  console.log("categoryId",categoryId)
  console.log("products",products)

  if (!categoryId || !Array.isArray(products)) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }


// Example inside your loop or before insertMany
const formattedProducts = products.map((prod) => ({
  ...prod,
  slug: slugify(prod.name),
  skuid: `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, // or use uuid
}));

  try {
    const createdProducts = await Product.insertMany(formattedProducts);


    // Add new products to category
    const productIds = createdProducts.map(p => p._id);
    await Category.findByIdAndUpdate(categoryId, {
      $addToSet: { products: { $each: productIds } },
    });

    return res.status(201).json({ success: true, products: createdProducts });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ success: false, message: "Failed to add products" });
  }
}
