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

        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {topSellingProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-4 h-full">
                  <Card className="h-full bg-white rounded-xl shadow hover:shadow-lg transition">
                    <CardContent className="p-5 flex flex-col items-center text-center">
                      <div className="w-full h-[200px] relative mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs bg-yellow-400 text-white font-semibold px-3 py-1 rounded-full mb-2">
                        #{product.rank} Best Seller
                      </span>
                      <h3 className="text-lg font-bold text-blue-800 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex gap-2">
                        <button 
                            onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition">
                          Add to Cart
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm transition">
                          Buy Now
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
