"use client";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Cameron Williamson",
    title: "Designer",
    quote:
      "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Esther Howard",
    title: "Marketing",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Devon Lane",
    title: "Developer",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia magni dolores eos qui ratione.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function ModernTestimonials() {
  return (
    <section className="py-16 bg-white text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              What our customers are saying us?
            </h2>
          </div>
          <div className="flex items-center gap-8 mt-6 lg:mt-0 text-gray-600 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-black">10M+</div>
              Happy People
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-black">4.88</div>
              Overall rating
              <div className="text-yellow-500 text-lg">★★★★★</div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-200 border border-gray-100 shadow-sm hover:shadow-md rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    {t.name} <Quote className="w-4 h-4 text-gray-400" />
                  </h4>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
