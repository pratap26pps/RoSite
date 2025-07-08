"use client";
import Link from "next/link";

export default function YoutubeTrust() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#172554] text-white overflow-hidden font-sans">
      {/* 🔷 Animated Blurred Floating Circles */}
      <div className="absolute top-16 left-1/4 w-72 h-72 bg-blue-400/30 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-12 right-1/5 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-float delay-1000" />

      {/* 🧮 SVG Grid Background */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0L0 0 0 10" stroke="white" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 items-center">
        {/* 🌟 Trust Info */}
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

          <ul className="list-disc pl-6 space-y-3 text-blue-100">
            <li>🔧 Installed 25,000+ RO Systems since 1999</li>
            <li>🏆 Trusted by homes, hospitals, schools & defense</li>
            <li>📞 Live support in Ballabhgarh, Faridabad & NCR</li>
            <li>🎯 24×7 expert service with doorstep setup</li>
          </ul>
        </div>

        {/* 🎥 YouTube Highlights Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
          <h3 className="text-xl font-semibold text-red-500 mb-4">
            🎥 YouTube Channel Highlights
          </h3>
          <ul className="space-y-3 text-blue-100 text-base">
            <li>✅ Over <strong>1,00,000</strong> Subscribers</li>
            <li>✅ <strong>2M+</strong> Views across tutorials & reviews</li>
            <li>✅ Real customer reviews & live demos</li>
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

     

      {/* 🌀 Floating Animation Style */}
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
