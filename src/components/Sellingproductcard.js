"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IndianRupee } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";
import { ChevronLeft, ChevronRight, Star, Trophy, Medal, Award } from "lucide-react";
import DressStyleCarousel from "./categoryproduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import YoutubeTrust from "../pages/youtube";
 

const topSellingProducts = [
  {
    id: 1,
    name: "AquaMax Pro",
    image: "/images/image copy.png",
    description: "Best-selling RO purifier with advanced 7-stage filtration.",
    rank: 1,
    price: "$399",
    rating: 4.8,
    soldCount: "2.5K+",
  },
  {
    id: 2,
    name: "CoolFlow Elite",
    image: "/images/image copy 2.png",
    description: "High-efficiency water cooler loved by institutions.",
    rank: 2,
    price: "$299",
    rating: 4.7,
    soldCount: "1.8K+",
  },
  {
    id: 3,
    name: "Pump Master 3000",
    image: "/images/image copy 3.png",
    description: "Compact, powerful RO pump with silent operation.",
    rank: 3,
    price: "$129",
    rating: 4.6,
    soldCount: "1.2K+",
  },
  {
    id: 4,
    name: "AquaPro Elite",
    image: "/images/image copy 4.png",
    description: "Smart RO with app control and TDS monitor.",
    rank: 4,
    price: "$549",
    rating: 4.9,
    soldCount: "980+",
  },
  {
    id: 5,
    name: "AquaPro Elite Pro",
    image: "/images/image copy 5.png",
    description: "Premium smart RO with advanced monitoring.",
    rank: 5,
    price: "$649",
    rating: 4.8,
    soldCount: "750+",
  },
  {
    id: 6,
    name: "AquaPro Elite Max",
    image: "/images/image copy 8.png",
    description: "Ultimate smart RO with AI-powered features.",
    rank: 6,
    price: "$749",
    rating: 4.9,
    soldCount: "650+",
  },
];

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    case 2:
      return <Medal className="w-4 h-4 text-gray-400" />;
    case 3:
      return <Award className="w-4 h-4 text-amber-600" />;
    default:
      return <span className="text-xs font-bold text-blue-600">#{rank}</span>;
  }
};

const getRankBadgeColor = (rank) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    case 3:
      return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
    default:
      return "bg-gradient-to-r from-blue-500 to-blue-700 text-white";
  }
};

export default function TopSellingProductsAndDressStyle() {
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <section className="relative py-12 sm:py-16 md:py-24 font-sans overflow-hidden  ">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
          
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-700 tracking-tight">
                Top Selling Products
              </h2>
             
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular water purification solutions trusted by thousands of customers
            </p>
          </div>

          <Carousel 
            opts={{ 
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }} 
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {topSellingProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-[85%] xs:basis-[80%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.333%] xl:basis-[25%]"
                >
                  <div className="h-full">
                    <div className=" rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 overflow-hidden group hover:scale-[1.02] hover:-translate-y-1 relative">
                    

                      {/* Image Container */}
                      <div className="relative w-full h-48 sm:h-52 md:h-56  overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent z-10"></div>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300"
                          sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, (max-width: 1280px) 33vw, 25vw"
                          priority={product.rank <= 3}
                        />
                        
                        {/* Price Badge */}
                        <div className="absolute bottom-3 flex right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg">
                          <IndianRupee className="w-5 h-5" /> {product.price}  {product.price}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-300 mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
                            {product.name}
                          </h3>
                          
                          {/* Rating and Sales */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-300">{product.rating}</span>
                            </div>
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {product.soldCount} sold
                            </div>
                          </div>

                          <p className="text-sm sm:text-base text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-md hover:shadow-lg"
                          >
                            Add to Cart
                          </button>
                          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-md hover:shadow-lg">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200" />
              <CarouselNext className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200" />
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center mt-6 sm:hidden">
              <div className="flex space-x-2">
                {topSellingProducts.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-blue-200 transition-all duration-200"
                  />
                ))}
              </div>
            </div>
          </Carousel>

           
       

          <DressStyleCarousel  />
          <YoutubeTrust/>
      
   
        </div>

        {/* Enhanced Animations */}
        <style jsx>{`
          .animate-blob {
            animation: blob 20s infinite;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .animation-delay-5000 {
            animation-delay: 5s;
          }
          
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(40px, -30px) scale(1.1);
            }
            66% {
              transform: translate(-30px, 20px) scale(0.9);
            }
          }

          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @media (max-width: 480px) {
            .xs\\:basis-\\[80\\%\\] {
              flex-basis: 80%;
            }
          }
        `}</style>
      </section>
    </>
  );
}