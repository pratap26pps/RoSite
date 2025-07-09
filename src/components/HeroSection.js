"use client";
import { useEffect, useState } from "react";
import { Truck, CalendarDays, Clock } from "lucide-react";

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

      {/* First Section - Original Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-40 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Section */}
        <div 
          className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl">
            PURE <span className="text-cyan-300 animate-pulse">WATER</span> FOR HEALTHY LIFE
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed">
            Get access to the cleanest water with advanced RO purification technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="group relative px-8 py-3 text-base font-semibold rounded-full bg-white text-blue-700 shadow-2xl hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative">Our Services</span>
            </button>
            <button className="group relative px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative">Discover More</span>
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div 
          className={`flex justify-center md:justify-end transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
        >
          <div className="relative">
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl scale-110 animate-pulse"></div>
            <img
              src="https://wavio.peerduck.com/wp-content/uploads/2022/09/Group-447.png"
              alt="Water Girl"
              className="relative w-[90%] drop-shadow-2xl max-w-[600px] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Second Section - Water Delivery */}
      <section className="relative w-full min-h-screen px-6 py-16 sm:py-24 overflow-hidden text-white font-sans">
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
                    <Icon className="w-5 h-5 text-cyan-300" />
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
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                💧 Order Now
              </button>
              <button className="text-cyan-300 border-cyan-300 border px-6 py-3 rounded-full text-base hover:bg-cyan-100/10 transition-all duration-300">
                🔍 Read More
              </button>
            </div>
          </div>
        </div>
      </section>

       

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