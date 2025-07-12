import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    title: "RO (Reverse Osmosis)",
    image: "/images/image copy 4.png",
    description: "Ideal for areas with high TDS",
  },
  {
    id: 2,
    title: "UV (Ultraviolet)",
    image: "/images/image copy 5.png",
    description: "Perfect for water with high microbial contamination.",
  },
  {
    id: 3,
    title: "UF (Ultrafiltration)",
    image: "/images/image copy 3.png",
    description: "Used for low TDS water to remove bacteria.",
  },
  {
    id: 4,
    title: "Mineral Water",
    image: "/images/image copy 6.png",
    description: "Great for health-conscious users.",
  },
  {
    id: 5,
    title: "Carbon Filter",
    image: "/images/image copy 2.png",
    description: "Removes chlorine, bad taste, and odors.",
  },
  {
    id: 6,
    title: "Sediment Filter",
    image: "/images/image copy.png",
    description: "Pre-filtration for dust, rust, and sand.",
  },
];

const DressStyleCarousel = () => {
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
            BROWSE BY <span className="text-blue-600">CATEGORY WATER PURIFY</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((style) => (
            <div
              key={style.id}
              className="transition-all duration-500 rounded-2xl border border-blue-100 hover:border-blue-300 group overflow-hidden shadow hover:shadow-lg bg-white"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="relative mb-4 overflow-hidden rounded-xl h-56">
                  <img
                    src={style.image}
                    alt={style.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{style.title}</h3>
                <p className="text-gray-600 flex-1">{style.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Explore {style.title}
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
