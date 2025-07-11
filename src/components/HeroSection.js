"use client";
import { useEffect, useState } from "react";
import { Truck, CalendarDays, Clock,Settings, ShoppingCart,ShoppingBag, Search } from "lucide-react";
 import { useRouter } from "next/navigation";
import { CarouselSize } from "./ProductCard";
import TopSellingProductsAndDressStyle from "./Sellingproductcard";
import TestimonialSection from "./Testimonial";
// Cursor Spotlight Component
const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-30 w-96 h-96 rounded-full opacity-20 transition-all duration-300"
      style={{
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.2) 25%, transparent 70%)',
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
      }}
    />
  );
};

// Enhanced Background Components
const BackgroundBeams = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    {/* Deep Dark Blues Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black" />
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-slate-800/30 to-cyan-900/20" />
    
    {/* Animated Beams */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
      <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse opacity-60" style={{ animationDelay: '300ms' }} />
      <div className="absolute bottom-1/4 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse opacity-60" style={{ animationDelay: '700ms' }} />
      <div className="absolute top-3/4 right-1/4 w-px h-20 bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-pulse opacity-60" style={{ animationDelay: '1000ms' }} />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce opacity-60" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-bounce opacity-60" style={{ animationDuration: '4s', animationDelay: '1000ms' }} />
      <div className="absolute top-1/2 left-1/8 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-bounce opacity-60" style={{ animationDuration: '3.5s', animationDelay: '500ms' }} />
    </div>
  </div>
);

const Spotlight = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1500ms' }} />
  </div>
);

const AnimatedGrid = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 opacity-30 z-0">
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:50px_50px] transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Overlay Grid with Different Opacity */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:25px_25px] transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      />
      
      {/* Dot Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:30px_30px] transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      />
    </div>
  );
};

// Floating Particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden z-5">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-ping"
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
export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateButtons, setAnimateButtons] = useState(false);
const router= useRouter()
  useEffect(() => {
    // Trigger visibility for custom animations on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimateButtons(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Enhanced Background Effects */}
      <CursorSpotlight />
      <BackgroundBeams />
      <Spotlight />
      <AnimatedGrid />
      <FloatingParticles />
      
      {/* Animated Border Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" style={{ animationDelay: '1000ms' }} />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400/50 to-transparent animate-pulse" style={{ animationDelay: '1500ms' }} />
      </div>

    {/* First Section - Enhanced Hero */}
    
 
        <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-20  ">
 
        <div className="relative z-20 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Section - Content */}
          <div 
            className={`flex-1 space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            {/* Tagline */}
            <div className="inline-block bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-sm border border-cyan-300/30 rounded-full px-6 py-2 mb-6">
              <p className="text-cyan-300 font-semibold text-sm tracking-wide">
                ✨ India's Most Trusted Custom RO Experts – Since 1999
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl font-black leading-tight drop-shadow-2xl">
              PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 animate-pulse">WATER</span>
              <br />
              FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">HEALTHY</span> LIFE
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">
              Experience the purest water with our advanced RO purification technology. 
              Custom-built systems designed for your family's health and happiness.
            </p>

           {/* Feature Highlights */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  {[
    { icon: Truck, title: "Advanced RO Tech", desc: "99.9% Purification" },
    { icon: CalendarDays, title: "Custom Solutions", desc: "Tailored for You" },
    { icon: Clock, title: "25+ Years Trust", desc: "Proven Excellence" }
  ].map((feature, index) => {
    const Icon = feature.icon;
    return (
     <div
  key={index}
  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-300/20 hover:border-cyan-300/40 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left"
>
  <Icon className="w-6 h-6 text-cyan-300 mb-2" />
  <h3 className="text-white font-semibold">{feature.title}</h3>
  <p className="text-cyan-200 text-sm">{feature.desc}</p>
</div>

    );
  })}
</div>


 

{/* CTA Buttons */}
<div className="flex flex-wrap gap-3 pt-4 justify-center sm:justify-start">
  <button
      onClick={()=>router.push("/custom-room")}
  className="group cursor-pointer relative px-6 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 overflow-hidden transform hover:scale-[1.03]">
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
    <span className="relative flex items-center gap-2">
      <Settings className="w-5 h-5" />
      Build Your RO
    </span>
  </button>

  <button
     onClick={()=>router.push("/shop")}
  className="group cursor-pointer relative px-6 py-3 text-base font-semibold rounded-full bg-white/10 backdrop-blur-sm border border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-black transition-all duration-300 transform hover:scale-[1.03]">
    <span className="relative flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      Explore Products
    </span>
  </button>
</div>



            
          </div>

          {/* Right Section - Enhanced Image */}
          <div 
            className={`flex-1 flex justify-center mt-5 lg:justify-end transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="relative">
          
             
              
              {/* Main Image */}
              <img
                src="https://wavio.peerduck.com/wp-content/uploads/2022/09/Group-447.png"
                alt="Pure Water for Healthy Life"
                height={445}
                width={445}
                className="relative  drop-shadow-2xl  hover:scale-105 transition-transform duration-500 "
              />
              
              {/* Decorative Ring */}
            </div>
          </div>
        </div>

         
      </section>
 
 

      {/* Second Section - Water Delivery */}
        <section className="relative w-full min-h-screen px-6 pt-0 md:-mb-40 pb-9  sm:pb-24 overflow-hidden text-white font-sans  ">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://wavio.peerduck.com/wp-content/uploads/2020/12/Group-69-7.png"
              alt="Water Delivery"
              width={500}
              height={500}
              className="rounded-full object-cover shadow-xl"
            />
          </div>
          {/* Right Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              DELIVERY <span className="text-cyan-300">SERVICE</span>
            </h2>
            <p className="text-slate-200 text-lg max-w-xl">
              Our refreshing purified bottled water can now be delivered directly to your door
              with our fast and reliable water delivery service.
            </p>
            {/* Service Info */}
            <div className="space-y-4">
              {[
                { icon: Truck, label: "FREE DELIVERY" },
                { icon: CalendarDays, label: "7 DAYS A WEEK" },
                { icon: Clock, label: "8:00 - 23:00" },
              ].map(({ icon: Icon, label }, index) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="bg-cyan-600/20 p-2 rounded-full">
                    <Icon className="w-5 h-5v flex justify-center text-cyan-300" />
                  </div>
                  <span className="font-semibold text-white tracking-wide">{label}</span>
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start transition-opacity duration-1000 ${
                animateButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button className="bg-gradient-to-r from-cyan-600 cursor-pointer to-blue-800 hover:from-cyan-700 hover:to-blue-600 hover:bg-cyan-600 flex text-white text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                <ShoppingBag className="w-5 h-5" />Order Now
              </button>
              <button className="text-cyan-300 border-cyan-300 cursor-pointer flex border px-6 py-3 rounded-full text-base hover:bg-cyan-100/10 transition-all duration-300">
                  <Search className="w-5 h-5" />Read More
              </button>
            </div>
          </div>
        </div>
      </section>

       <CarouselSize/>
       <TopSellingProductsAndDressStyle/>
       <TestimonialSection/>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}