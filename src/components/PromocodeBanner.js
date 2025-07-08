"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Copy } from "lucide-react";

const offers = [
  {
    title: "New Year Special",
    code: "RO2025",
    description: "Get flat ₹500 OFF on any custom RO setup.",
  },
  {
    title: "Refer & Save",
    code: "REFER100",
    description: "Refer a friend and get ₹100 cashback on each install.",
  },
  {
    title: "Festive Combo Offer",
    code: "COMBO10",
    description: "10% OFF on Pump + Cooler combo purchase.",
  },
];

export default function PromoOffers() {
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <section className="relative py-20 px-4 font-sans bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#172554] text-white overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-10 right-1/3 w-60 h-60 bg-cyan-400/20 rounded-full blur-[100px] animate-float delay-1000" />

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100 mb-4">
          ✨ Special Offers Just for You
        </h2>
        <p className="text-blue-200 text-base mb-10">
          Tap the code to copy & apply at checkout. Limited time only!
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="rounded-3xl bg-white/10 text-white shadow-xl backdrop-blur-lg p-6 transition-transform hover:scale-[1.03]"
            >
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-blue-100 mb-4">
                {offer.description}
              </p>

              <div className="flex items-center justify-between bg-blue-900/40 border border-blue-700 rounded-xl px-4 py-2 shadow-inner">
                <span className="font-mono text-cyan-300 font-semibold text-sm tracking-wide">
                  {offer.code}
                </span>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
