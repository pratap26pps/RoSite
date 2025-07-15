"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Youtube } from "lucide-react";

const faqs = [
  {
    question: "What is the warranty period for your RO systems?",
    answer: "All systems come with a standard 1-year warranty. Extended warranty available on request.",
  },
  {
    question: "Is installation free?",
    answer: "Yes, FREE ASSEMBLING & installation is provided across our service areas.",
  },
  {
    question: "Do you offer service support after purchase?",
    answer: "Yes, we provide ongoing AMC (Annual Maintenance Contracts) and on-call support.",
  },
  {
    question: "Which RO system is best for borewell water?",
    answer: "We recommend RO + UV + UF systems for hard water like borewell supply.",
  },
  {
    question: "How often should I replace the filters?",
    answer: "Pre-filters every 3–6 months and RO membrane annually, depending on usage.",
  },
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer className="bg-gray-300 text-gray-800 px-2 sm:px-4 pt-16 pb-10 relative w-full max-w-[100vw] overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 w-full">
        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-blue-500 pb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => toggleFAQ(i)}
                className="bg-white p-4 rounded-lg shadow border border-gray-200 cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-base text-gray-800 break-words max-w-full">{faq.question}</h3>
                  {activeIndex === i ? (
                    <ChevronUp className="text-gray-500 w-5 h-5" />
                  ) : (
                    <ChevronDown className="text-gray-500 w-5 h-5" />
                  )}
                </div>
                <div
                  className={`mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${
                    activeIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="flex flex-col md:flex-row   gap-y-8 md:gap-y-0 w-full">
          {/* Contact Info */}
          <div className="space-y-3 text-sm flex-1 min-w-0">
            <h3 className="text-base font-semibold border-b border-blue-500  text-gray-900 pb-2">
              Contact Information
            </h3>
            <p className="break-words max-w-full">
              <MapPin className="inline w-4 h-4 mr-1" /> <strong>Address:</strong> Ballabhgarh, Faridabad, Haryana – 121004</p>
            <p className="break-words max-w-full">
              <Phone className="inline w-4 h-4 mr-1" /> <strong>Phone:</strong> +91-9876543210, +91-9998887776</p>
            <p className="break-words max-w-full">
              <Mail className="inline w-4 h-4 mr-1" /> <strong>Email:</strong> support@rotechnicalxperts.com</p>
            <p className="break-words max-w-full">
              <Youtube className="inline w-4 h-4 mr-1" /> <strong>YouTube:</strong>{" "}
              <a
                href="https://youtube.com/@rotechnicalxperts"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-words max-w-full"
              >
                RO TECHNICAL XPERTS
              </a>
            </p>
          </div>

 
            {/* Company Links */}
            <div className="space-y-2   flex flex-col items-center lg:items-start text-sm min-w-0">
              <h3 className="text-base border-b border-blue-500 pb-2  font-semibold text-gray-900">Company</h3>
              <ul className="text-gray-600 space-y-3 mt-4">
                <li><a href="/about" className="break-words max-w-full">About</a></li>
                <li><a href="#" className="break-words max-w-full">Services</a></li>
                <li><a href="#" className="break-words max-w-full">Certifications</a></li>
                <li><a href="#" className="break-words max-w-full">Contact</a></li>
              </ul>
            </div>

            
 
        </div>

        {/* Footer Bottom */}
        <div className="lg:mt-6 text-center text-gray-500 text-sm border-t border-gray-300 pt-2 w-full break-words max-w-full">
          &copy; {new Date().getFullYear()} RO TECHNICAL XPERTS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
