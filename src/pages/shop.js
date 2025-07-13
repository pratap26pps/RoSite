"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";
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
import { Search, Filter, DollarSign, Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
 
 
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
    id: 6,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 4.png",
  },
  {
    id: 7,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 5.png",
  },
  {
    id: 8,
    name: "Carbon Filter Z3",
    sqNumber: "SQ789",
    category: "Carbon",
    price: 5000,
    image: "/images/image copy 4.png",
  },
  {
    id: 9,
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
  const [addedToCart, setAddedToCart] = useState([]);
const router=useRouter()
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
    if (!product) return;

    dispatch(addToCart(product));
    toast.success(`${product.name} is added`);
    console.log(`Added ${product.name} to cart`);

      setAddedToCart((prev) => [...prev, id]);
  };

  return (
    <div className="bg-white min-h-screen">

 
      {/* Header Section */}
      <section className="relative  overflow-hidden">
       
       
        {/* Heading */}
        <div className="relative z-40 pt-32  text-center">
         
          <p className="text-black text-lg max-w-2xl mx-auto px-4">
            Discover our collection of high-quality water purification systems
          </p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8 px-4 py-10 z-30 relative">
        {/* Sidebar */}
        <aside className="w-full lg:sticky top-20 self-start   md:w-1/4 space-y-6">
          <div className="bg-white text-black rounded-2xl p-6 border-2">
            
            {/* Search */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Search Products</h3>
              </div>
              <div className="relative">
                <Input
                  placeholder="Name or SQ number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-slate-800/50 border-slate-600   placeholder:text-slate-100   pl-4 pr-4 py-3 rounded-xl"
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-slate-100" />
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-6"></div>

            {/* Category */}
            <div className="space-y-3">
              <div className="flex items-center gap-2   mb-3">
                <Filter className="w-5 h-5" />
                <h3 className="text-lg font-semibold ">Filter by Category</h3>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-12">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-slate-100 border-slate-600 rounded-xl">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className=" hover:bg-slate-700 focus:bg-slate-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-6"></div>

            {/* Price Slider */}
            <div className="space-y-4">
              <div className="flex items-center gap-2   mb-3">
                <IndianRupee className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Price Range</h3>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={20000}
                step={500}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span className="bg-slate-700/50 px-3 py-1 rounded-lg  ">
                  ₹{priceRange[0].toLocaleString()}
                </span>
                <span className="bg-slate-700/50 px-3 py-1 rounded-lg ">
                  ₹{priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-6"></div>

            {/* Reviews */}
            <div className="space-y-3">
              <div className="flex items-center gap-2   mb-3">
                <Star className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Recent Reviews</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Aakash", review: "Great product!", rating: 5 },
                  { name: "Neha", review: "Fast delivery.", rating: 4 },
                  { name: "Raju", review: "Worth the price.", rating: 5 }
                ].map((review, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-slate-900 text-sm font-medium">{review.name}</span>
                    </div>
                    <p className="text-slate-500 text-sm">"{review.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Product Grid */}
        <div className="w-full md:w-3/4">
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedProducts.map((product) => (
             <Card
  key={product.id}
  className=" bg-white border border-gray-200 pb-4 pt-0 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 transform  mx-5"
>
  <div className="relative overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover transition-transform duration-300 "
    />
    <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full shadow">
      {product.category}
    </div>
  </div>

  <CardContent className="space-y-1">
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">SQ: {product.sqNumber}</p>
      <div className="text-xl font-semibold text-blue-600">
        ₹{product.price.toLocaleString()}
      </div>
    </div>

    
    {/* Store Icons */}
    <div className="space-y-4 mt-auto">
                         <button
                           onClick={() => router.push(`/${product.id}`)}
                        className="w-full cursor-pointer bg-black text-white text-center py-2 rounded-xl font-bold text-lg">
                          View
                        </button>
  
                          <div className="flex items-center justify-center gap-4">
                              <ShoppingCart 
                                onClick={() => carthandler(product.id)}
      disabled={addedToCart.includes(product.id)}
      className={` border-2  h-[50px] w-[50px] rounded-lg ${
        addedToCart.includes(product.id)
          ? "  bg-green-400  cursor-not-allowed"
          : "text-blue-600  hover:text-blue-700"
      } font-semibold py-2 rounded-lg flex items-center justify-center gap-2`}
                             />
                            <Image src="https://www.kent.co.in/images/icons/amazon-simple.svg"  className="cursor-pointer border-2 p-2  rounded-lg" alt="Amazon" width={50} height={50} />
                            <Image src="https://www.kent.co.in/images/icons/flipkart-simple.svg"  className="cursor-pointer border-2 p-2  rounded-lg" alt="Flipkart" width={50} height={50} />
                          </div>
                        </div>
  </CardContent>
</Card>

            ))}

            {paginatedProducts.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-300 mb-2">No Products Found</h3>
                  <p className="text-slate-400">No products match your current filters. Try adjusting your search criteria.</p>
                </div>
              </div>
            )}
          </main>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2">
                <Pagination>
                  <PaginationContent className="gap-2">
                    {/* Previous Arrow */}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                          currentPage === 1
                            ? "text-slate-500 cursor-not-allowed"
                            : "text-slate-300 hover:bg-slate-700 hover:text-blue-400"
                        }`}
                      >
                        ←
                      </PaginationLink>
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                            currentPage === i + 1
                              ? "  text-white shadow-lg"
                              : "text-slate-300 hover:bg-slate-700 hover:text-blue-400"
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
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                          currentPage === totalPages
                            ? "text-slate-500 cursor-not-allowed"
                            : "text-slate-300 hover:bg-slate-700  "
                        }`}
                      >
                        →
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}