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
    <section className="relative py-20 text-white overflow-hidden font-sans">
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 items-center">
        {/* Trust Info */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100 mb-4 leading-tight">
            Trusted by 25,000+ Clients <br /> Since{" "}
            <span className="text-blue-300">1999</span>
          </h2>
          <p className="text-blue-200 text-base mb-5">
            RO TECHNICAL XPERTS isn’t just an online store — we’ve been
            transforming homes, hospitals, schools, and industries across NCR for
            20+ years.
          </p>

          <ul className="space-y-3 text-blue-100">
            <li className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-300" />
              Installed 25,000+ RO Systems since 1999
            </li>
            <li className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-cyan-300" />
              Trusted by homes, hospitals, schools & defense
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-cyan-300" />
              Live support in Ballabhgarh, Faridabad & NCR
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-300" />
              24×7 expert service with doorstep setup
            </li>
          </ul>
        </div>

        {/*  YouTube Highlights Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-xl font-semibold text-red-500 mb-4 flex items-center gap-2">
            <Youtube className="w-5 h-5" /> YouTube Channel Highlights
          </h3>
          <ul className="space-y-3 text-blue-100 text-base">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Over <strong>1,00,000</strong> Subscribers
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <strong>2M+</strong> Views across tutorials & reviews
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Real customer reviews & live demos
            </li>
          </ul>

          <Link
            href="https://youtube.com/@rotechnicalxperts"
            target="_blank"
            className="inline-block mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700 transition duration-300"
          >
            Visit Our YouTube Channel
          </Link>
        </div>
      </div>


      {/*  Floating Animation Style */}
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
