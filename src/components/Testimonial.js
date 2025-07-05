import React from "react";

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
        name: "David Lee",
        title: "Developer, CodeBase",
        quote: "The animations and UI are top-notch.",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
];

const Testimonial = () => (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-purple-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What Our Clients Say
        </h2>
        <div className="flex overflow-x-auto space-x-6 px-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
            {testimonials.map((t, idx) => (
                <div
                    key={idx}
                    className="min-w-[320px] bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
                >
                    <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-16 h-16 rounded-full border-4 border-purple-200 mb-4 shadow"
                    />
                    <p className="text-gray-600 italic mb-4 text-center">"{t.quote}"</p>
                    <div className="text-center">
                        <div className="font-semibold text-purple-700">{t.name}</div>
                        <div className="text-sm text-gray-400">{t.title}</div>
                    </div>
                </div>
            ))}
        </div>
        <style>
            {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.7s both;
                }
                /* Custom scrollbar for Tailwind */
                .scrollbar-thin {
                    scrollbar-width: thin;
                }
                .scrollbar-thumb-purple-300::-webkit-scrollbar-thumb {
                    background-color: #d6bcfa;
                    border-radius: 8px;
                }
                .scrollbar-track-purple-100::-webkit-scrollbar-track {
                    background-color: #faf5ff;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    height: 8px;
                }
            `}
        </style>
    </div>
);

export default Testimonial;