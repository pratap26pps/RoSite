import { useState } from "react";
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
    setTimeout(() => setCopiedCode(""), 2000); // Reset after 2s
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          💸 Special Offers for Our Customers
        </h2>
        <p className="text-gray-600 mb-10">
          Use these promo codes while ordering for exciting discounts!
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="bg-white rounded-xl shadow-md p-6 relative hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{offer.title}</h3>
              <p className="text-gray-700 mb-4">{offer.description}</p>

              <div className="flex items-center justify-between bg-blue-100 px-3 py-2 rounded-lg">
                <span className="font-mono font-semibold text-blue-700">{offer.code}</span>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
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
    </section>
  );
}
