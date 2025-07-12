import React, { useState, useEffect } from 'react';

const ReviewsComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Alisa Hester",
      role: "PM, Hourglass",
      company: "Web Design Agency",
      rating: 5,
      review: "The design system has transformed our workflow completely. Amazing attention to detail and user experience.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9fc6ad9?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-amber-400 to-orange-500"
    },
    {
      id: 2,
      name: "Rich Wilson",
      role: "COO, Command+R",
      company: "Web Development Agency",
      rating: 5,
      review: "Incredible components that saved us months of development time. The quality is outstanding.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-emerald-400 to-cyan-500"
    },
    {
      id: 3,
      name: "Annie Stanley",
      role: "Designer, Catalog",
      company: "UX Agency",
      rating: 5,
      review: "Untitled has saved us thousands of hours. The design system is comprehensive and well-thought-out.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-violet-400 to-purple-500"
    },
    {
      id: 4,
      name: "Johnny Bell",
      role: "PM, Sisyphus",
      company: "Machine Learning",
      rating: 5,
      review: "The components are beautifully crafted and incredibly functional. A game-changer for our projects.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-sky-400 to-blue-500"
    },
    {
      id: 5,
      name: "Mia Ward",
      role: "Fullstack Dev, Quotient",
      company: "Performance Marketing",
      rating: 5,
      review: "Outstanding quality and attention to detail. The documentation is excellent and easy to follow.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-rose-400 to-pink-500"
    },
    {
      id: 6,
      name: "Archie Young",
      role: "Marketing, Layers",
      company: "Machine Learning",
      rating: 5,
      review: "The flexibility and customization options are incredible. Perfect for our diverse client needs.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
      color: "from-indigo-400 to-blue-500"
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const Avatar = ({ src, alt, size = 70 }) => (
    <div className="rounded-full overflow-hidden border-2 border-blue-300" style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );

  const Button = ({ children }) => (
    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300">
      {children}
    </button>
  );

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Don't just take our word for it</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from some of our amazing customers who are building faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <Avatar src={review.avatar} alt={review.name} />
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.role}</p>
                  <p className="text-gray-400 text-xs">{review.company}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-gray-700 italic">"{review.review}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button>Join thousands of satisfied customers</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsComponent;
