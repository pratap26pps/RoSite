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
  };

  // Add a product to the selected category
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!selectedCategory || !productForm.name.trim() ||!productForm.quantity || !productForm.price) return;
    const newProduct = {
      ...productForm,
      id: Date.now().toString(),
      image: productForm.image,
    };
    setProducts((prev) => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newProduct],
    }));
    setProductForm({ name: "", price: "", quantity: "", image: null, description: "" });
  };

  // Handle image upload (for demo, just store file object)
  const handleImageChange = (e) => {
    setProductForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  return (
    <div className="min-h-screen w-full px-2 sm:px-6  transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
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
                   {/* <div>
                    <Label htmlFor="productquantity" className="font-semibold">productquantity</Label>
                    <Input
                      id="productquantity"
                      type="number"
                      value={productForm.quantity}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g. 8499"
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                      required
                    />
                  </div> */}
                  <div>
                    <Label htmlFor="productImage" className="font-semibold">Image</Label>
                    <Input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 border-blue-200 dark:border-gray-700 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                    />
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
                        {prod.image && (
                          <img
                            src={prod.image instanceof File ? URL.createObjectURL(prod.image) : prod.image}
                            alt={prod.name}
                            className="w-14 h-14 object-cover rounded border border-blue-200 dark:border-cyan-700 shadow"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-base flex items-center gap-2">
                            {prod.name}
                            <span className="inline-block bg-blue-100 dark:bg-cyan-900 text-blue-700 dark:text-cyan-300 text-xs px-2 py-0.5 rounded-full font-medium">₹{prod.price}</span>
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