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
  
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-16 animate-gradient  relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
      
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
      

<footer className=" text-white py-12 mt-7">
  <div className="max-w-7xl mx-auto  flex flex-col md:flex-row md:justify-around gap-8 text-sm">
    {/* Contact Info (Stacked on mobile) */}
    <div className="space-y-3 text-gray-300">
      <h3 className="text-base font-semibold text-white border-b border-blue-500 pb-2">
        Contact Information
      </h3>
      <p>📍 <strong>Address:</strong> Ballabhgarh, Faridabad, Haryana – 121004</p>
      <p>📞 <strong>Phone:</strong> +91-9876543210, +91-9998887776</p>
      <p>📧 <strong>Email:</strong> support@rotechnicalxperts.com</p>
      <p>📺 <strong>YouTube:</strong> 
        <a
          href="https://youtube.com/@rotechnicalxperts"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline ml-1"
        >
          RO TECHNICAL XPERTS
        </a>
      </p>
    </div>

    {/* Links */}
    <div className="flex  md:flex-row gap-44 justify-between">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-white">Company</h3>
        <ul className="text-gray-400 space-y-1">
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-white">Social</h3>
        <ul className="text-gray-400 space-y-1">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Twitter</a></li>
          <li>
            <a
              href="https://youtube.com/@rotechnicalxperts"
              className="text-blue-400 underline"
              target="_blank" rel="noreferrer"
            >
              YouTube
            </a>
          </li>
        </ul>
      </div>
    </div>

  
  </div>

  {/* Footer Bottom */}
  <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
    &copy; {new Date().getFullYear()} RO TECHNICAL XPERTS. All rights reserved.
  </div>
</footer>


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
