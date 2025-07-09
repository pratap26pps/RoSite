"use client";

import { useState, useEffect } from "react";

// Cursor Spotlight Component
const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 w-96 h-96 rounded-full opacity-15 transition-all duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.2) 25%, transparent 70%)",
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
      }}
    />
  );
};

// Background Beams
const BackgroundBeams = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black" />
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-slate-800/30 to-cyan-900/20" />

    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-40" />
      <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse opacity-40" style={{ animationDelay: "300ms" }} />
      <div className="absolute bottom-1/4 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse opacity-40" style={{ animationDelay: "700ms" }} />
      <div className="absolute top-3/4 right-1/4 w-px h-20 bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-pulse opacity-40" style={{ animationDelay: "1000ms" }} />

      <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-xl animate-bounce opacity-50" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-xl animate-bounce opacity-50" style={{ animationDuration: "5s", animationDelay: "1000ms" }} />
      <div className="absolute top-1/2 left-1/8 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-xl animate-bounce opacity-50" style={{ animationDuration: "4.5s", animationDelay: "500ms" }} />
    </div>
  </div>
);

// Animated Grid
const AnimatedGrid = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 opacity-20 z-0">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:50px_50px] transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:25px_25px] transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      />
    </div>
  );
};

// Floating Particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden z-5">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-ping"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

// Main Carousel Component
const DressStyleCarousel = () => {
  const [hoveredRow1, setHoveredRow1] = useState(0); // default: first card
  const [hoveredRow2, setHoveredRow2] = useState(3); // default: third card
  const [isVisible, setIsVisible] = useState(false);

  const dressStyles = [
    {
      id: 1,
      title: "RO (Reverse Osmosis)",
      image: "/images/image copy 4.png",
      description: " Areas with high TDS ",
    },
    {
      id: 2,
      title: "UV (Ultraviolet)",
      image: "/images/image copy 5.png",
      description: "high microbial contamination.",
    },
    {
      id: 3,
      title: " UF (Ultrafiltration)",
      image: "/images/image copy 3.png",
      description: " Low TDS water and removing bacteria ",
    },
    {
      id: 4,
      title: " Mineral Water ",
      image: "/images/image copy 6.png",
      description: " Health-conscious users",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const renderRow = (rowCards, hoveredIndex, setHovered) => (
    <div className="flex gap-6 lg:scale-75 w-full ">
      {rowCards.map((style, idx) => {
        const globalIndex = dressStyles.findIndex((s) => s.id === style.id);
        return (
          <div
            key={style.id}
            onMouseEnter={() => setHovered(globalIndex)}
            onMouseLeave={() => setHovered(globalIndex)}
            className={`transition-all duration-700 rounded-3xl lg:-mt-20 border border-cyan-400/20 hover:border-cyan-400/40 group overflow-hidden
              ${hoveredIndex === globalIndex ? "w-[80%]" : "w-[20%]"}
            `}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/60 backdrop-blur-sm p-6 h-full">
              <div className="relative mb-4 overflow-hidden rounded-2xl h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                    {style.title}
                  </h3>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {style.description}
              </p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                  Explore {style.title}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden top-20 text-white">
      <CursorSpotlight />
      <BackgroundBeams />
      <AnimatedGrid />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            BROWSE BY <span className="text-cyan-300">CATEGORY WATER PURIFY</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* 2x2 Hover Responsive Rows */}
        {renderRow(dressStyles.slice(0, 2), hoveredRow1, setHoveredRow1)}
        {renderRow(dressStyles.slice(2, 4), hoveredRow2, setHoveredRow2)}
      </div>
    </div>
  );
};

export default DressStyleCarousel;
