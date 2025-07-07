"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
const dummyProducts = [
  {
    id: 1,
    name: "Water Purifier X1",
    sqNumber: "SQ123",
    category: "RO",
    price: 12000,
    image: "/images/image copy 2.png",
  },
  {
    id: 2,
    name: "UV Filter Y2",
    sqNumber: "SQ456",
    category: "UV",
    price: 8000,
    image: "/images/image copy 6.png",
  },
  {
    id: 3,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy.png",
  },
  {
    id: 4,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 4.png",
  },
  {
    id: 5,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 5.png",
  },
  {
    id: 4,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 4.png",
  },
  {
    id: 5,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 5.png",
  },
  {
    id: 4,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 4.png",
  },
  {
    id: 5,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 5.png",
  },
   
];

const categories = ["All", "RO", "UV", "Carbon"];
const PRODUCTS_PER_PAGE = 6;
export default function ShopPage() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 20000]);
 const [currentPage, setCurrentPage] = useState(1);
const dispatch = useDispatch()
  const filteredProducts = dummyProducts.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sqNumber.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchSearch && matchCategory && matchPrice;
  });

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

const carthandler = async (id) => {
  const product = dummyProducts.find((product) => product.id === id);
  if (!product) return toast.error("Product not found");

  localStorage.setItem("specific-product", JSON.stringify(product));
  toast.success(`${product.name} is added`);
  dispatch(addToCart(product));
};


  return (
    <div className="bg-blue-50 relative">
<section className="relative bg-blue-50">
  {/* SVG curve at the top */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
    <svg
      className="w-full h-32 md:h-60"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#60a5fa"  // light blue background for curve
        d="M0,160L60,176C120,192,240,224,360,213.3C480,203,600,149,720,154.7C840,160,960,224,1080,229.3C1200,235,1320,181,1380,154.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
    </svg>
  </div>

  {/* Heading */}
  <h2 className="text-4xl flex justify-center font-semibold mb-2 text-blue-700 z-40 pt-32">
    Products
  </h2>
</section>
   
    <div className="flex flex-col md:flex-row gap-6 px-4 py-10 z-30 bg-blue-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 h-[60%] space-y-8 bg-blue-100 p-8 rounded-xl shadow-sm">
        {/* Search */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">🔍 Search Products</h2>
          <Input
            placeholder="Name or SQ number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-gray-800 border-2 border-gray-600 p-2"
          />
        </div>

        {/* Category */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">📦 Filter by Category</h2>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-md">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  <p className="text-gray-700">{category}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>

        {/* Price Slider */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">💰 Filter by Price</h2>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={20000}
            step={500}
            className="mb-2"
          />
          <div className="text-sm text-gray-600 flex justify-between">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">⭐ Recent Reviews</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>“Great product!” – Aakash</li>
            <li>“Fast delivery.” – Neha</li>
            <li>“Worth the price.” – Raju</li>
          </ul>
        </div>
      </aside>

         {/* Main Product Grid */}
      <div className="w-full md:w-3/4">
        <main className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
          {paginatedProducts.map((product) => (
            <Card key={product.id} className="rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white flex flex-col justify-between h-[380px] p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <CardContent className="p-2 flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <h3 className="text-blue-700 font-semibold text-lg">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">SQ: {product.sqNumber}</p>
                  <p className="text-green-600 font-bold text-base">₹{product.price}</p>
                </div>
                <button
                onClick={()=>carthandler(product.id)}
                className="mt-4 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 text-sm transition w-full">
                  Add to Cart
                </button>
              </CardContent>
            </Card>
          ))}

          {paginatedProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products match your filters.
            </div>
          )}
        </main>
{/* pagination */}
        {totalPages > 1 && (
  <Pagination>
    <PaginationContent className="justify-center gap-1 mt-4">
      {/* Previous Arrow */}
      <PaginationItem>
        <PaginationLink
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={`px-3 py-2 rounded-md border ${
            currentPage === 1
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          «
        </PaginationLink>
      </PaginationItem>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-2 rounded-md border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Next Arrow */}
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          className={`px-3 py-2 rounded-md border ${
            currentPage === totalPages
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          »
        </PaginationLink>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)}

      </div>
    </div>
     </div>
  );
}
