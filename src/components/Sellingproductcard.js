import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import  toast  from "react-hot-toast";
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
    rank: 4,
  },
   {
    id: 6,
    name: "AquaPro Elite",
    image: "/images/image copy 8.png",
    description: "Smart RO with app control and TDS monitor.",
    rank: 4,
  },
];

export default function TopSellingProducts() {

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`)
}
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-10">
           Top Selling Products
        </h2>

        <Carousel opts={{ align: "start" }} className="w-full overflow-hidden relative">
          <CarouselContent>
                {topSellingProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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
    </section>
  );
}
