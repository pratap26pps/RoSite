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

const topSellingProducts = [
  {
    id: 1,
    name: "AquaMax Pro",
    image: "/images/image copy.png",
    description: "Best-selling RO purifier with advanced 7-stage filtration.",
    rank: 1,
  },
  {
    id: 2,
    name: "CoolFlow Elite",
    image: "/images/image copy 2.png",
    description: "High-efficiency water cooler loved by institutions.",
    rank: 2,
  },
  {
    id: 3,
    name: "Pump Master 3000",
    image: "/images/image copy 3.png",
    description: "Compact, powerful RO pump with silent operation.",
    rank: 3,
  },
  {
    id: 4,
    name: "AquaPro Elite",
    image: "/images/image copy 4.png",
    description: "Smart RO with app control and TDS monitor.",
    rank: 4,
  },
  {
    id: 5,
    name: "AquaPro Elite",
    image: "/images/image copy 5.png",
    description: "Smart RO with app control and TDS monitor.",
    rank: 5,
  },
  {
    id: 6,
    name: "AquaPro Elite",
    image: "/images/image copy 8.png",
    description: "Smart RO with app control and TDS monitor.",
    rank: 6,
  },
];

export default function TopSellingProducts() {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="relative py-24 font-sans overflow-hidden">
      {/* Balloon Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-400 via-cyan-300 to-indigo-500 rounded-full blur-[200px] opacity-30 animate-blob animation-delay-1000 top-[-200px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-400 to-blue-600 rounded-full blur-[150px] opacity-20 animate-blob animation-delay-3000 top-[300px] right-[-200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12 tracking-tight">
           Top Selling Products
        </h2>

        <Carousel opts={{ align: "start" }} className="w-full overflow-visible relative">
          <CarouselContent>
            {topSellingProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="min-w-0 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <div className="h-full">
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 h-full relative">
                    
                    {/* Product Image */}
                    <figure className="px-4 pt-6 h-44 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </figure>

                    {/* Card Body */}
                    <div className="card-body items-center text-center">
                      <h3 className="card-title text-blue-800 text-lg sm:text-xl">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Buttons */}
                      <div className="card-actions mt-4 flex gap-2">
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

      {/* Blob Animation Keyframes */}
      <style jsx>{`
        .animate-blob {
          animation: blob 18s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 20px) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}
