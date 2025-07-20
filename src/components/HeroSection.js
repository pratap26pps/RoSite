// ⛱️ Use this version to apply white/light theme only
import { CarouselSize } from "./ProductCard";
import YoutubeTrust from "../pages/youtube";
import DressStyleCarousel from "./categoryproduct";
import TestimonialSection from "./Testimonial";
import { useEffect, useState } from "react";
import {
  Truck,
  CalendarDays,
  Clock,
  Settings,
  ShoppingCart,
  ShoppingBag,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/crausel1.png",
    "/images/crausel2.png",
    "/images/crausel3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-gray-800 bg-white">
      <section className="relative w-full mt-20 min-h-screen overflow-hidden">
        {/* 🔹 Background Image with Right-Bottom Cut */}
        <div className="absolute inset-0 h-[80vh] mt-1 mr-5 ml-5 rounded-2xl overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out rounded-2xl ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide})`,
                clipPath:
                  "polygon(0 0, 100% 0, 100% 80%, 100% 100%, 50% 100%, 0 100%)",
              }}
            />
          ))}
        </div>

        {/* 🔹 Content Box */}
        <div className="relative z-10 w-full min-h-screen flex items-center justify-start px-4 mt-56 lg:mt-3 sm:px-0 py-10 sm:py-20">
          <div className="mx-auto sm:ml-20 w-full max-w-xl">
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 sm:p-10 text-left space-y-6 shadow-lg">
              {/* Tagline */}
              <div className="inline-block bg-blue-100 border border-blue-200 rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
                <p className="text-blue-600 font-semibold text-xs sm:text-sm tracking-wide text-center sm:text-left">
                  India's Most Trusted Custom RO Technical Xperts – Since 1999
                </p>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-gray-900">
                PURE <span className="text-blue-500">WATER</span>
                <br />
                FOR <span className="text-cyan-600">HEALTHY</span> LIFE
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-800">
                Experience the purest water with our advanced RO purification
                technology. Custom-built systems designed for your family's
                health and happiness.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 lg:justify-start justify-center pt-2 sm:pt-4">
                <button
                  onClick={() => router.push("/custom-room")}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-md transition text-sm sm:text-base"
                >
                  <Settings className="w-5 h-5" />
                  Customize Your RO
                </button>
                <button
                  onClick={() => router.push("/shop")}
                  className="border border-blue-400 cursor-pointer text-blue-600 hover:bg-blue-50 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 transition text-sm sm:text-base"
                >
                  <ShoppingCart className="w-5 h-5 " />
                  Explore Products
                </button>
              </div>

              {/* 🔹 Mobile: Stats inside card */}
              <div className="flex sm:hidden flex-col items-center justify-between gap-6 pt-6 border-t border-gray-300 mt-4 ">
                {[
                  { count: "680", label: "Award Winning" },
                  { count: "8K+", label: "Happy Customers" },
                  { count: "500+", label: "Property Ready" },
                ].map(({ count, label }) => (
                  <div key={label} className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{count}</h3>
                    <p className="text-sm text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Desktop: Stats floating on bottom right */}
        <div className="absolute bottom-32 right-5 z-20 hidden sm:block w-[40%]">
          <div className="bg-white/90 backdrop-blur-md rounded-tl-3xl py-6 px-6 flex flex-row justify-around items-center gap-6 shadow-xl ">
            {[
              { count: "680", label: "Award Winning" },
              { count: "8K+", label: "Happy Customers" },
              { count: "500+", label: "Property Ready" },
            ].map(({ count, label }) => (
              <div key={label} className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{count}</h3>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section - Delivery */}
      <section className="relative w-full h-[85vh] px-6 text-gray-800  font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://ubtpro.in/img/International-Courier.jpg"
              alt="Water Delivery"
              width={500}
              height={500}
              className="rounded-2xl shadow-xl"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
              DELIVERY <span className="text-blue-500">SERVICE</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Our refreshing purified bottled water can now be delivered
              directly to your door with our fast and reliable water delivery
              service.
            </p>
            <div className="space-y-4">
              {[
                { icon: Truck, label: "FREE DELIVERY" },
                { icon: CalendarDays, label: "7 DAYS A WEEK" },
                { icon: Clock, label: "8:00 - 23:00" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 mt-6    transition-opacity duration-1000`}
            >
              <button
                onClick={() => router.push("/shop")}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex   justify-center gap-2 shadow-md transition text-sm sm:text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Now
              </button>
              <button
                onClick={() => router.push("/about")}
                className="border border-blue-400 cursor-pointer text-blue-600 hover:bg-blue-50 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex justify-center gap-2 transition text-sm sm:text-base"
              >
                <Search className="w-5 h-5" />
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      <CarouselSize />

      <DressStyleCarousel />
      <YoutubeTrust />
      <TestimonialSection />
    </div>
  );
}
