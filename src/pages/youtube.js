"use client";
import Link from "next/link";
import {
  Wrench,
  Trophy,
  PhoneCall,
  Target,
  CheckCircle,
  Youtube,
} from "lucide-react";

export default function YoutubeTrust() {
  return (
    <section className="relative py-20   text-gray-800 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 items-center px-6">
        {/* 🔹 Trust Information */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4 leading-tight">
            Trusted by 25,000+ Clients <br /> Since{" "}
            <span className="text-cyan-600">1999</span>
          </h2>
          <p className="text-gray-600 text-base mb-6">
            RO TECHNICAL XPERTS isn’t just an online store — we’ve been
            transforming homes, hospitals, schools, and industries across NCR for
            over 20 years.
          </p>

          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-500" />
              Installed 25,000+ RO Systems since 1999
            </li>
            <li className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Trusted by homes, hospitals, schools & defense
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-green-500" />
              Live support in Ballabhgarh, Faridabad & NCR
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              24×7 expert service with doorstep setup
            </li>
          </ul>
        </div>

        {/*  YouTube Highlights Card */}
      
<div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all">
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
    {/* Left Textual Content */}
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
        <Youtube className="w-5 h-5" /> YouTube Channel Highlights
      </h3>

      <ul className="space-y-3 text-gray-700 text-base">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Over <strong>1,00,000</strong> Subscribers
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <strong>2M+</strong> Views across tutorials & reviews
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Real customer reviews & live demos
        </li>
      </ul>

       {/* Right Logo/Image */}
    <div className="w-24 h-24 mt-6 flex ml-20 lg:hidden shrink-0">
      <img
        src="/images/youtubelogo.jpg"  
        alt="RO Technical Xperts Logo"
        className="w-full h-full object-contain rounded-2xl scale-125"
      />
    </div>

      <Link
        href="https://youtube.com/@rotechnicalxperts"
        target="_blank"
        className="inline-block mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700 transition duration-300"
      >
        Visit Our YouTube Channel
      </Link>
    </div>

    {/* Right Logo/Image */}
    <div className="w-24 hidden lg:block h-24 shrink-0">
      <img
        src="/images/youtubelogo.jpg"  
        alt="RO Technical Xperts Logo"
        className="w-full h-full object-contain rounded-2xl scale-125"
      />
    </div>
  </div>
</div>

      
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
