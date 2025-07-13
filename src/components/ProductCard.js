// Updated Carousel with eCommerce-style CTA section
"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IndianRupee, ShoppingCart } from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import { useRouter } from "next/router";
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
    bestSeller: true,
  },
  {
    id: 2,
    name: "EcoPure Water Cooler",
    image: "/images/image copy 2.png",
    description: "Energy-efficient stainless steel water cooler.",
    price: 199,
    bestSeller: false,
  },
  {
    id: 3,
    name: "Mini Pump Pro",
    image: "/images/image copy 3.png",
    description: "Compact water pump for all RO systems.",
    price: 89,
    bestSeller: false,
  },
  {
    id: 4,
    name: "AquaPro Elite",
    image: "/images/image copy 4.png",
    description: "Smart RO with app control and TDS monitor.",
    price: 449,
    bestSeller: true,
  },
  {
    id: 5,
    name: "AquaPro Elite Pro",
    image: "/images/image copy 5.png",
    description: "Advanced smart RO with IoT connectivity.",
    price: 549,
    bestSeller: false,
  },
  {
    id: 6,
    name: "AquaPro Elite Max",
    image: "/images/image copy 6.png",
    description: "Premium smart RO with AI-powered monitoring.",
    price: 649,
    bestSeller: true,
  },
];

export function CarouselSize() {
  const router=useRouter();
  const dispatch = useDispatch();
  const [addedToCartIds, setAddedToCartIds] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
    setAddedToCartIds((prev) => [...prev, product.id]);
  };

    const carthandler = async (id) => {
    const product = dummyProducts.find((product) => product.id === id);
    if (!product) return;

    dispatch(addToCart(product));
    toast.success(`${product.name} is added`);
    console.log(`Added ${product.name} to cart`);

      setAddedToCart((prev) => [...prev, id]);
  };

  return (
    <section className="relative font-sans overflow-hidden lg:-mt-48 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold  mb-4 tracking-tight">
            Explore Our Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium water purification solutions designed for modern homes
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true, skipSnaps: false, dragFree: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-[85%] xs:basis-[80%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.333%] xl:basis-[25%]"
              >
                <div className="h-full">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-200 overflow-hidden group hover:scale-[1.02] hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative w-full h-56 overflow-hidden">
                      {product.bestSeller && (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded z-20 shadow-md">
                          Best Seller
                        </span>
                      )}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300 pt-3"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, (max-width: 1280px) 33vw, 25vw"
                        priority={product.id <= 4}
                      />
                      <div className="absolute flex top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold z-20">
                        <IndianRupee className="w-5 h-5" /> {product.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-4">
                          {product.description}
                        </p>
                      </div>

                      {/* Action Section */}
                      <div className="space-y-4 mt-auto">
                        <button
                           onClick={() => router.push(`/${product.id}`)}
                        className="w-full cursor-pointer bg-black text-white text-center py-2 rounded-xl font-bold text-lg">
                          View
                        </button>

                        <div className="flex items-center justify-center gap-4">
                                  <ShoppingCart
                                onClick={() => handleAddToCart(product.id)}
      disabled={addedToCart?.includes(product.id)}
      className={`t scale-200 ${
        addedToCart?.includes(product.id)
          ? "bg-green-600 text-white cursor-not-allowed"
          : "text-blue-600  hover:text-blue-700"
      } font-semibold py-2 rounded-lg flex items-center justify-center gap-2`}
                             />
                          <Image src="https://www.kent.co.in/images/icons/amazon-simple.svg"  className="cursor-pointer" alt="Amazon" width={36} height={36} />
                          <Image src="https://www.kent.co.in/images/icons/flipkart-simple.svg"  className="cursor-pointer" alt="Flipkart" width={36} height={36} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 w-12 h-12 rounded-full shadow-md hover:shadow-xl transition-all duration-200" />
            <CarouselNext className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white border-2 border-blue-100 hover:border-blue-300 text-blue-600 hover:text-blue-700 w-12 h-12 rounded-full shadow-md hover:shadow-xl transition-all duration-200" />
          </div>

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
    </section>
  );
}
