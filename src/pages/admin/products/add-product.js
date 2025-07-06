"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addProduct } from "@/src/redux/slices/productSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Books" },
];

export default function AddProduct() {
  
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    items: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    name: form.name,
    description: form.description,
    price: form.price,
    items: form.items,
    category: selectedCategory,
    image: imagePreviews[0] || "/images/default.png",
  };

  dispatch(addProduct(newProduct));

  // Reset form
  setForm({ name: "", description: "", price: "", items: "" });
  setSelectedCategory("");
  setImages([]);
  setImagePreviews([]);
};

  return (
    <div className="min-h-screen bg-gradient-to-br  bg-blue-200  flex items-center justify-center px-4 ">
      <div className="w-full max-w-3xl bg-blue-100 shadow-2xl rounded-2xl p-4 lg:p-20 mb-7 mt-24">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Category */}
          <div>
            <Label className="mb-1 block">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="border-2 border-gray-400">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-1 block">
              Product Name
            </Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="border-2 border-gray-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="mb-1 block">
              Description
            </Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="border-2 border-gray-400"
              required
            />
          </div>

          {/* Images */}
          <div>
            <Label htmlFor="images" className="mb-1 block">
              Product Images
            </Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border-2 text-black border-gray-400"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i}`}
                    className="w-full aspect-square object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="mb-1 block">
              Price (₹)
            </Label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              className="border-2 border-gray-400"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Items */}
          <div>
            <Label htmlFor="items" className="mb-1 block">
              Number of Items
            </Label>
            <Input
              type="number"
              name="items"
              value={form.items}
              onChange={handleInputChange}
              className="border-2 border-gray-400"
              min="1"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button type="submit" className="w-full sm:w-auto">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
