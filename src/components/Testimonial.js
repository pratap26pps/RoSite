"use client";
const testimonials = [
  {
    name: "Alice Johnson",
    title: "CEO, ExampleCorp",
    quote: "This service exceeded my expectations. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bob Smith",
    title: "CTO, TechWorld",
    quote: "A seamless experience from start to finish.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Carla Gomez",
    title: "Designer, Creatives",
    quote: "Beautiful design and great support. Love it!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Lee",
    title: "Developer, CodeBase",
    quote: "The animations and UI are top-notch.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Emily Clark",
    title: "Manager, AquaFlow",
    quote: "Professional, clean and very reliable service.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative overflow-hidden pb-20 -mt-20 text-white w-full">
       
      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-blue-100 py-8 font-sans tracking-tight z-10 relative">
         What Our Clients Say
      </h2>

      {/* Scrolling Testimonials */}
      <div className="w-screen overflow-hidden">
        <div className="flex w-max animate-scroll-horizontal-fast">
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="min-w-[320px] bg-white/10 backdrop-blur-xl text-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-[1.03] hover:shadow-xl mx-2"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full border-4 border-blue-400 shadow-lg mb-4"
              />
              <p className="text-sm italic text-center mb-4 max-w-xs">“{t.quote}”</p>
              <div className="text-center">
                <div className="font-semibold text-blue-300">{t.name}</div>
                <div className="text-xs text-gray-300">{t.title}</div>
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

        .animate-scroll-horizontal-fast {
          animation: scroll-left 30s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
