import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function AddCategoryProduct() {
  // Local state for categories and products
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    quantity:"",
    images: [],
    description: "",
  });
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Add a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      description: categoryDesc,
    };
    setCategories([...categories, newCategory]);
    setCategoryName("");
    setCategoryDesc("");
    setMessage({ type: 'success', text: 'Category added successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Add a product to the selected category
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!selectedCategory || !productForm.name.trim() ||!productForm.quantity || !productForm.price) return;
    const newProduct = {
      ...productForm,
      id: Date.now().toString(),
      images: productForm.images,
    };
    setProducts((prev) => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newProduct],
    }));
    setProductForm({ name: "", price: "", quantity: "", images: [], description: "" });
    setMessage({ type: 'success', text: 'Product added successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Handle image upload (multiple)
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(file => formData.append('image', file));
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log("upload file",result)
      if (response.ok && result.urls) {
        setProductForm((prev) => ({ ...prev, images: result.urls }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  // Submit all categories and products to API
  const handleSubmitAll = async () => {
    if (categories.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one category first!' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data for API
      const categoriesData = categories.map(cat => ({
        name: cat.name,
        description: cat.description
      }));
      console.log("categoriesData", categoriesData)
      console.log("products", products)
      const response = await fetch('/api/admin/addcatprod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories: categoriesData,
          products: products
        }),
      });
 
      const result = await response.json();

      if (response.ok) {
        // Check if there were any errors
        if (result.results.errors.length > 0) {
          const errorMessages = result.results.errors.map(err => err.error).join(', ');
          setMessage({ 
            type: 'error', 
            text: `Some items failed to save: ${errorMessages}` 
          });
          console.error('Errors occurred:', result.results.errors);
        } else {
          setMessage({ 
            type: 'success', 
            text: `Successfully created ${result.results.categories.length} categories and ${result.results.products.length} products!` 
          });
          
          // Clear form data after successful submission
          setCategories([]);
          setProducts({});
          setSelectedCategory(null);
        }
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to save data' });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen w-full px-2 sm:px-6  transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300' 
              : 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Add Category Form */}
        <Card className="mb-10 p-8 bg-white/90 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-2xl rounded-2xl transition-colors">
          <h3 className="text-xl font-bold text-blue-600 dark:text-cyan-300 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 dark:bg-cyan-400 rounded-full animate-pulse"></span>
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <Label htmlFor="categoryName" className="font-semibold">Category Name</Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g. RO Purifier"
                className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="flex-1 w-full">
              <Label htmlFor="categoryDesc" className="font-semibold">Description</Label>
              <Input
                id="categoryDesc"
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
                placeholder="Optional description"
                className="mt-1 border-blue-100 dark:border-gray-700 focus:ring-blue-300 dark:bg-gray-900 dark:text-white"
              />
            </div>
            <Button type="submit" className="h-12 mt-4 sm:mt-0 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-bold shadow-md hover:from-blue-600 hover:to-cyan-600">Add Category</Button>
          </form>
        </Card>

        {/* Submit All Button */}
        {categories.length > 0 && (
          <Card className="mb-10 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 shadow-xl rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-green-700 dark:text-green-300">
                  Ready to Save?
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  {categories.length} categories and {Object.values(products).flat().length} products ready to save
                </p>
              </div>
              <Button 
                onClick={handleSubmitAll}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-700 dark:to-blue-700 text-white font-bold shadow-md hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save All to Database'}
              </Button>
            </div>
          </Card>
        )}

        {/* Category List & Product Form */}
        <div className="grid gap-10">
          {categories.length === 0 && (
            <div className="text-center text-gray-400 dark:text-gray-500 italic py-12">No categories yet. Add one above!</div>
          )}
          {categories.map((cat) => (
            <Card key={cat.id} className="p-6 sm:p-8 bg-white/95 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-xl rounded-2xl transition-all hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-blue-50 dark:border-gray-700 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 dark:text-cyan-300 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 dark:bg-cyan-400 rounded-full"></span>
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{cat.description}</p>
                </div>
                <Button
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full sm:w-auto font-semibold border-2 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white border-blue-400 dark:border-cyan-700' : 'border-blue-200 dark:border-gray-600 text-blue-700 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                >
                  {selectedCategory === cat.id ? "Adding Products" : "Add Products"}
                </Button>
              </div>
              {/* Product Form for this category */}
              {selectedCategory === cat.id && (
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-blue-50/40 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-100 dark:border-gray-700">
                  <div>
                    <Label htmlFor="productName" className="font-semibold">Product Name</Label>
                    <Input
                      id="productName"
                      value={productForm.name}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. AquaSure Delight"
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="productPrice" className="font-semibold">Price (₹)</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g. 8499"
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                      required
                    />
                  </div>
                   <div>
                    <Label htmlFor="productQuantity" className="font-semibold">Product Quantity</Label>
                    <Input
                      id="productquantity"
                      type="number"
                      value={productForm.quantity}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, quantity: e.target.value }))}
                      placeholder="e.g. 10"
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="productImage" className="font-semibold">Images</Label>
                    <Input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                    />
                    {/* Preview uploaded images */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {productForm.images && productForm.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`preview-${idx}`} className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700 shadow" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="productDesc" className="font-semibold">Description</Label>
                    <Input
                      id="productDesc"
                      value={productForm.description}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Short description"
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="col-span-full flex justify-end">
                    <Button type="submit" className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-bold shadow hover:from-blue-600 hover:to-cyan-600">Add Product</Button>
                  </div>
                </form>
              )}
              {/* List products for this category */}
              {products[cat.id] && products[cat.id].length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-blue-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-cyan-400 dark:bg-cyan-600 rounded-full"></span>
                    Products in {cat.name}:
                  </h4>
                  <div className="grid gap-3">
                    {products[cat.id].map((prod) => (
                      <div key={prod.id} className="flex items-center gap-4 p-3 bg-cyan-50 dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                        {prod.images && prod.images.length > 0 && (
                          <div className="flex gap-2">
                            {prod.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={prod.name}
                                className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700 shadow"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-base flex items-center gap-2">
                            {prod.name}
                            <span className="inline-block bg-blue-100 dark:bg-cyan-900 text-blue-700 dark:text-cyan-300 text-xs px-2 py-0.5 rounded-full font-medium">₹{prod.price}</span>
                            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">Qty: {prod.quantity}</span>
                          </div>
                          <div className="text-gray-500 dark:text-gray-300 text-sm mt-1">{prod.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 