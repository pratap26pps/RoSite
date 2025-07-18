"use client"; 
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 

const DressStyleCarousel = () => {
  const router = useRouter();

  const categories = useSelector((state) => state.category.categories);
 console.log("categories",categories)
 const buildCategories = categories.filter(
  (cat) => cat.categoryType === "homecategory"  ||    cat.categoryType === "customplushome"
);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen top-20 scale-95 bg-white text-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            BROWSE BY <span className="text-blue-600">CATEGORY</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-6">
          {buildCategories.map((style) => (
            <div
              key={style._id}
               onClick={() => router.push(`/shop?id=${style._id}`)}
              className="transition-all duration-500 rounded-2xl border border-blue-100 hover:border-blue-300 group overflow-hidden shadow hover:shadow-lg bg-white"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="relative mb-4 overflow-hidden rounded-xl h-56">
                  <img
                    src={style.catImage}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{style.name}</h3>
                <p className="text-gray-600 flex-1">{style.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Explore {style.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DressStyleCarousel;
