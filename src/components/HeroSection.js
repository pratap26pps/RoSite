"use client";
import { useEffect } from "react";
import CursorSpotlight from "./CursorSpotlight"; // adjust path if needed

// Background Components
const BackgroundBeams = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-900 to-cyan-900" />
    <div className="absolute inset-0">
      {/* Beams */}
      <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
      <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-300 opacity-60" />
      <div className="absolute bottom-1/4 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-700 opacity-60" />
      
      {/* Orbs */}
      <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/8 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-float delay-500" />
    </div>
  </div>
);

const Spotlight = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 opacity-20 z-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
);

export default function HeroSection() {
  useEffect(() => {
    import("aos").then((AOS) => AOS.init({ duration: 1000 }));
  }, []);

  return (
    <section className="relative w-full  min-h-screen overflow-hidden text-white">
      {/* Aceternity UI Backgrounds */}
      <CursorSpotlight />
      <BackgroundBeams />
      <Spotlight />
      <GridPattern />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-40  grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Section */}
        <div data-aos="fade-right" className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            PURE <span className="text-cyan-300">WATER</span> FOR HEALTHY LIFE
          </h1>
          <p className="text-lg text-slate-200">
            Get access to the cleanest water with advanced RO purification technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="btn px-8 py-3 text-base font-semibold rounded-full bg-white text-blue-700 shadow-md hover:bg-blue-100 hover:text-blue-900 transition">
              Our Services
            </button>
            <button className="btn px-8 py-3 text-base font-semibold rounded-full bg-blue-700 text-white shadow-md hover:bg-blue-800 transition">
               Discover More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-end" data-aos="fade-left">
          <img
            src="https://wavio.peerduck.com/wp-content/uploads/2022/09/Group-447.png"
            alt="Water Girl"
            className="w-[90%] drop-shadow-2xl max-w-[600px] "
          />
        </div>
      </div>

     
    </section>
  );
}
