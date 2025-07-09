"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is the warranty period for your RO systems?",
    answer:
      "All systems come with a standard 1-year warranty. Extended warranty available on request.",
  },
  {
    question: "Is installation free?",
    answer:
      "Yes, FREE ASSEMBLING & installation is provided across our service areas.",
  },
  {
    question: "Do you offer service support after purchase?",
    answer:
      "Yes, we provide ongoing AMC (Annual Maintenance Contracts) and on-call support.",
  },
  {
    question: "Which RO system is best for borewell water?",
    answer: "We recommend RO + UV + UF systems for hard water like borewell supply.",
  },
  {
    question: "How often should I replace the filters?",
    answer:
      "Pre-filters every 3–6 months and RO membrane annually, depending on usage.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer: "Yes, COD is available in selected regions.",
  },
  {
    question: "Can I customize the RO design or color?",
    answer: "Yes, we offer customization options in our Custom Room section.",
  },
  {
    question: "Where are you located?",
    answer: "Ballabhgarh, Faridabad, Haryana – servicing across NCR.",
  },
  {
    question: "Do you sell on Amazon or Flipkart?",
    answer:
      "Yes, our products are available on Amazon and Flipkart. See store links.",
  },
  {
    question: "How to contact for bulk/wholesale orders?",
    answer: "Use the contact form or call us directly for B2B deals.",
  },
  {
    question: "How many clients do you have?",
    answer: "Over 25,000+ offline clients since 1999.",
  },
  {
    question: "Are your products certified?",
    answer:
      "Yes, we have full water test certifications available on the website.",
  },
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-16 animate-gradient  relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">
            Contact Information
          </h2>
          <div className="space-y-3 text-base leading-relaxed">
            <p>
              📍 <strong>Address:</strong> Ballabhgarh, Faridabad, Haryana – 121004
            </p>
            <p>
              📞 <strong>Phone:</strong> +91-9876543210, +91-9998887776
            </p>
            <p>
              📧 <strong>Email:</strong> support@rotechnicalxperts.com
            </p>
            <p>
              📺 <strong>YouTube:</strong>{" "}
              <a
                href="https://youtube.com/@rotechnicalxperts"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline"
              >
                RO TECHNICAL XPERTS
              </a>
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => toggleFAQ(i)}
                className="bg-gray-800 p-4 rounded-lg cursor-pointer border border-gray-700 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-base">{faq.question}</h3>
                  {activeIndex === i ? (
                    <FaChevronUp className="text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-300" />
                  )}
                </div>
                <div
                  className={`mt-2 text-sm text-gray-300 transition-all duration-300 ease-in-out overflow-hidden ${
                    activeIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} RO TECHNICAL XPERTS. All rights reserved.
      </div>

      {/* Gradient animation */}
      <style jsx>{`
        .animate-gradient {
          animation: gradientBG 10s ease infinite;
        }

        @keyframes gradientBG {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </footer>
  );
}
