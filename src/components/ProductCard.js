"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="relative py-24 font-sans overflow-hidden">
      {/* Balloon Background Effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 rounded-full blur-[150px] opacity-30 animate-blob animation-delay-1000 top-[-200px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-400 to-blue-600 rounded-full blur-[100px] opacity-20 animate-blob animation-delay-4000 top-[400px] right-[-200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12 tracking-tight">
          💧 Explore Our Products
        </h2>

        <Carousel opts={{ align: "start" }} className="w-full overflow-visible relative">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="min-w-0 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <div className="h-full">
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 h-full flex flex-col justify-between">
                    {/* Image */}
                    <div className="relative w-full h-36 mt-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain px-4"
                      />
                    </div>

                    {/* Body */}
                    <div className="card-body items-center text-center px-4 py-4">
                      <h3 className="card-title text-blue-800 text-lg sm:text-xl">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                      {/* Buttons */}
                      <div className="card-actions mt-4 flex flex-wrap justify-center gap-2 w-full">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-primary btn-sm"
                        >
                          Add to Cart
                        </button>
                        <button className="btn btn-success btn-sm">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg" />
        </Carousel>
      </div>

      {/* Tailwind balloon blob animation */}
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
      `}</style>
    </section>
  );
}
