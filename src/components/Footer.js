import { useState } from "react";

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
    answer: "Yes, our products are available on Amazon and Flipkart. See store links.",
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
    answer: "Yes, we have full water test certifications available on the website.",
  },
 
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer className="bg-gray-900 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>📍 <strong>Address:</strong> Ballabhgarh, Faridabad, Haryana – 121004</p>
          <p>📞 <strong>Phone:</strong> +91-9876543210, +91-9998887776</p>
          <p>📧 <strong>Email:</strong> support@rotechnicalxperts.com</p>
          <p>📺 <strong>YouTube:</strong> <a href="https://youtube.com/@rotechnicalxperts" target="_blank" className="text-blue-400 underline">RO TECHNICAL XPERTS</a></p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded p-4 cursor-pointer"
                onClick={() => toggleFAQ(i)}
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                {activeIndex === i && (
                  <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} RO TECHNICAL XPERTS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
