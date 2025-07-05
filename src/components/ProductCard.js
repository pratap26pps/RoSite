import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
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
  },
  {
    id: 2,
    name: "EcoPure Water Cooler",
    image: "/images/image copy 2.png",
    description: "Energy-efficient stainless steel water cooler.",
  },
  {
    id: 3,
    name: "Mini Pump Pro",
    image: "/images/image copy 3.png",
    description: "Compact water pump for all RO systems.",
  },
  {
    id: 4,
    name: "AquaPro Elite",
    image: "/images/image copy 4.png",
    description: "Smart RO with app control and TDS monitor.",
  },
  {
    id: 5,
    name: "AquaPro Elite",
    image: "/images/image copy 5.png",
    description: "Smart RO with app control and TDS monitor.",
  },
  {
    id: 6,
    name: "AquaPro Elite",
    image: "/images/image copy 6.png",
    description: "Smart RO with app control and TDS monitor.",
  },
];



export function CarouselSize() {
  const dispatch = useDispatch();

  //  const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("/api/products");
  //     setProducts(res.data);
  //   } catch (err) {
  //     toast.error("Failed to load products");
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);





  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`)

  }
  return (
  <section className="relative  bg-gradient-to-b from-blue-50 to-blue-100 py-24">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-10">
      💧 Explore Our Products
    </h2>

    <Carousel opts={{ align: "start" }} className="w-full overflow-hidden relative">
      <CarouselContent> 
        {products.map((product) => (
       <CarouselItem
  key={product.id}
  className="min-w-0 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
>

            <div className="p-2 lg:p-4 h-full">
              <Card className="flex flex-col h-full rounded-xl shadow-md hover:shadow-xl transition bg-white">
                <CardContent className="flex flex-col justify-between h-full lg:px-11 text-center">
                  {/* Image */}
                  <div className="relative w-full h-24 sm:h-44 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-1 flex-grow">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex -ml-6 lg:ml-0 lg:justify-between lg:scale-110  scale-75 gap-2 w-full">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 whitespace-nowrap bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 transition"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 whitespace-nowrap bg-green-500 text-white px-3 py-2 rounded-md text-sm hover:bg-green-600 transition">
                      Buy Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-2 sm:left-4"/>
      <CarouselNext className="-right-2 sm:right-4"/>
    </Carousel>
  </div>

  {/* SVG Bottom Curve */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-[100px]"
    >
      <path
        d="M0,0V46.29c47.22,22,104.2,36.92,166,40.36
            c60.69,3.37,125.63-6.61,185-22.26
            c61.87-16.3,120.76-39.69,185-39.87
            c61.86-.18,118.7,21.56,180,34.91
            c48.62,10.48,108,18.27,164,3.86
            c30.22-7.63,58.62-20.63,84-36.48V0Z"
        fill="#ffffff"
      />
    </svg>
  </div>
</section>

  );
}
