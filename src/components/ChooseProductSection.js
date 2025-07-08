"use client";
import { Truck, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function WaterDeliverySection() {
  // Trigger animation once after mount
  const [animateButtons, setAnimateButtons] = useState(false);

  useEffect(() => {
    setAnimateButtons(true);
  }, []);

  return (
    <section className="relative w-full  min-h-screen px-6 py-16 sm:py-24 overflow-hidden text-white font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af] animate-gradient bg-[length:300%_300%]" />

      {/* Spotlight Effect */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-radial from-cyan-400/30 via-blue-500/10 to-transparent rounded-full blur-3xl z-0 pointer-events-none" />

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
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300">
              💧 Order Now
            </Button>
            <Button
              variant="outline"
              className="text-cyan-300 border-cyan-300 px-6 py-3 rounded-full text-base hover:bg-cyan-100/10 transition-all duration-300"
            >
              🔍 Read More
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient animation */}
      <style jsx>{`
        .animate-gradient {
          animation: gradientFlow 15s ease infinite;
        }

        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
