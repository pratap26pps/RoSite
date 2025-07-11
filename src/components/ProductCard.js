"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IndianRupee } from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import { useState} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "AquaFresh RO System",
    image: "/images/image copy.png",
    description: "6-stage purification with UV + Mineral Guard.",
    price: 299,
  },
  {
    id: 2,
    name: "EcoPure Water Cooler",
    image: "/images/image copy 2.png",
    description: "Energy-efficient stainless steel water cooler.",
    price: 199,
  },
  {
    id: 3,
    name: "Mini Pump Pro",
    image: "/images/image copy 3.png",
    description: "Compact water pump for all RO systems.",
    price: 89,
  },
  {
    id: 4,
    name: "AquaPro Elite",
    image: "/images/image copy 4.png",
    description: "Smart RO with app control and TDS monitor.",
    price: 449,
  },
  {
    id: 5,
    name: "AquaPro Elite Pro",
    image: "/images/image copy 5.png",
    description: "Advanced smart RO with IoT connectivity.",
    price: 549,
  },
  {
    id: 6,
    name: "AquaPro Elite Max",
    image: "/images/image copy 6.png",
    description: "Premium smart RO with AI-powered monitoring.",
    price: 649,
  },
];

 
 
export function CarouselSize() {
  const dispatch = useDispatch();
const [addedToCartIds, setAddedToCartIds] = useState([]);

 const handleAddToCart = (product) => {
  dispatch(addToCart(product));
  toast.success(`${product.name} added to cart!`);
  setAddedToCartIds((prev) => [...prev, product.id]);
};


  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 font-sans overflow-hidden  ">
      
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
            Explore Our Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium water purification solutions designed for modern homes
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
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-[85%]  xs:basis-[80%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.333%] xl:basis-[25%]"
              >
                <div className="h-full">
                  <div className=" rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 overflow-hidden group hover:scale-[1.02] hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative w-full h-48 sm:h-52 md:h-56  overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10"></div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover   transition-transform duration-300"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, (max-width: 1280px) 33vw, 25vw"
                        priority={product.id <= 4}
                      />
                      {/* Price Badge */}
                      <div className="absolute flex top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold z-20">
                       <IndianRupee className="w-5 h-5" /> {product.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                      <button
  onClick={() => handleAddToCart(product)}
  disabled={addedToCartIds.includes(product.id)}
  className={`flex-1 px-4 py-2.5 rounded-xl font-medium text-sm sm:text-base shadow-md transition-all duration-200 transform active:scale-95 ${
    addedToCartIds.includes(product.id)
      ? "bg-green-700 text-white cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 hover:shadow-lg"
  }`}
>
  {addedToCartIds.includes(product.id) ? "Added" : "Add to Cart"}
</button>

                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-md hover:shadow-lg">
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
              {products.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-blue-200 transition-all duration-200"
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>

      {/* Enhanced animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
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
          .xs\:basis-\[80\%\] {
            flex-basis: 80%;
          }
        }
      `}</style>
    </section>
  );
}