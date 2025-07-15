import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SiFlipkart, SiAmazon } from 'react-icons/si';
import { useSelector, useDispatch } from "react-redux";
import { addCategory,setCategories } from "@/src/redux/slices/categorySlice";
import { setProducts,addProduct } from "@/src/redux/slices/productSlice";

export default function AddCategoryProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    quantity: "",
    images: [],
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories from backend on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          setAllCategories(data.categories);
          dispatch(setCategories(data.categories));
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchCategories();
  }, [dispatch]);

  // Add a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      description: categoryDesc,
    };
    dispatch(addCategory(newCategory));
    setCategoryName("");
    setCategoryDesc("");
    setMessage({ type: 'success', text: 'Category added successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Add a product to the selected category (local redux)
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!selectedCategory || !productForm.name.trim() ||!productForm.quantity || !productForm.price) return;
    const newProduct = {
      ...productForm,
      id: Date.now().toString(),
      category: selectedCategory,
      images: productForm.images,
    };
    dispatch(addProduct(newProduct));
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
      const response = await fetch('/api/uploadproductimages', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok && result.urls) {
        setProductForm((prev) => ({ ...prev, images: result.urls }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  // Add all products for this category to DB
  const handleAddAllToDB = async (catId) => {
    const catProducts = products.filter(p => (p.category === catId));
    if (!catProducts.length) return;
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch('/api/admin/addcatprod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: [],
          products: {
            [catId]: catProducts
          }
        })
      });
      const result = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'All products added to database!' });
        // Remove products for this category from redux
        dispatch(setProducts(products.filter(p => p.category !== catId)));
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add products' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
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
        {/* Category Selection and Add Category Form */}
        <Card className="mb-10 p-8 bg-white/90 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-2xl rounded-2xl transition-colors">
          <div className="flex flex-col md:justify-between gap-4 items-end">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-bold text-blue-600 dark:text-cyan-300 mb-2">Select Existing Category</h3>
              <select
                className="w-72 cursor-pointer p-2 border border-blue-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedCategory || ''}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select a category --</option>
                {/* Show backend categories */}
                {allCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
                {/* Show newly added (local) categories */}
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-4 items-end flex-1 w-full">
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
              <Button type="submit" className="h-12 cursor-pointer mt-4 sm:mt-0 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-bold shadow-md hover:from-blue-600 hover:to-cyan-600">Add Category</Button>
            </form>
          </div>
        </Card>
        {/* Product Form for Selected Category */}
        {selectedCategory && (() => {
          // Find selected category in backend or local
          const cat = allCategories.find(c => c._id === selectedCategory) || categories.find(c => c.id === selectedCategory);
          if (!cat) return null;
          // Get products for this category from redux
          const catProducts = products.filter(p => p.category === (cat.id || cat._id));
          return (
            <Card key={cat.id || cat._id} className="p-6 sm:p-8 bg-white/95 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-xl rounded-2xl transition-all hover:shadow-2xl mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-blue-50 dark:border-gray-700 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 dark:text-cyan-300 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 dark:bg-cyan-400 rounded-full"></span>
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{cat.description}</p>
                </div>
              </div>
              {/* Product Form for this category */}
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-blue-50/40 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-100 dark:border-gray-700 relative">
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
                <div className="col-span-full flex justify-between items-center mt-2">
                  <div className="flex gap-3 items-center">
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-bold shadow hover:from-blue-600 hover:to-cyan-600">
                      Create Product
                    </Button>
                  </div>
                  <div className="flex gap-4 items-center">
                    <SiFlipkart className="w-8 h-8 text-blue-600 cursor-pointer hover:scale-110 transition-transform" title="Flipkart" />
                    <SiAmazon className="w-8 h-8 text-yellow-600 cursor-pointer hover:scale-110 transition-transform" title="Amazon" />
                  </div>
                </div>
              </form>
              {/* Show Add All to Database button only if there are products for this category */}
              {catProducts.length > 0 && (
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={() => handleAddAllToDB(cat.id || cat._id)}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-700 dark:to-blue-700 text-white font-bold shadow hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Add All to Database'}
                  </Button>
                </div>
              )}
              {/* List products for this category */}
              {catProducts.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-blue-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-cyan-400 dark:bg-cyan-600 rounded-full"></span>
                    Products in {cat.name}:
                  </h4>
                  <div className="grid gap-3">
                    {catProducts.map((prod) => (
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
          );
        })()}
      </div>
    </div>
  );
} 