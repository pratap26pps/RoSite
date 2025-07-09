import React, { useState, useEffect } from 'react';

const ReviewsComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Sample reviews data with high-quality reviewer images
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

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 transition-colors duration-300 ${
              i < rating ? 'text-yellow-400' : 'text-slate-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Avatar Component with enhanced styling
  const Avatar = ({ src, alt, size = 70, colorScheme }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div 
        className="relative overflow-hidden rounded-full ring-4 ring-blue-500/30 shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-300"
        style={{ width: size, height: size }}
      >
        {!imageError && (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {(imageError || !imageLoaded) && (
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-r ${colorScheme} text-white font-bold text-xl`}>
            {alt ? alt.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
          </div>
        )}
        {imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        )}
      </div>
    );
  };

  // Button Component with dark theme
  const Button = ({ children, variant = 'primary', size = 'medium', onClick, className = '' }) => {
    const baseClasses = "font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500",
      secondary: "bg-slate-800/80 text-slate-300 border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-700/80 shadow-md hover:shadow-lg focus:ring-slate-400 backdrop-blur-sm"
    };
    
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg"
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="relative top-7 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Bubbles - Dark Blue Theme */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              i % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 
              i % 3 === 1 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 
              'bg-gradient-to-r from-indigo-500 to-purple-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              filter: 'blur(50px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-40 animate-bounce ${
              i % 2 === 0 ? 'bg-blue-400' : 'bg-cyan-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
           
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Don't just take our word for it
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hear from some of our amazing customers who are building faster.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`transform transition-all duration-700 ${
                animationKey > 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredCard(review.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`relative h-full p-6 rounded-2xl backdrop-blur-lg border border-slate-700/50 shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                  hoveredCard === review.id ? 'scale-105 shadow-blue-500/20' : 'scale-100'
                }`}
                style={{
                  background: hoveredCard === review.id 
                    ? `linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)` 
                    : 'rgba(30, 41, 59, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: hoveredCard === review.id ? 'rgba(59, 130, 246, 0.3)' : 'rgba(71, 85, 105, 0.3)',
                }}
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar
                      src={review.avatar}
                      alt={review.name}
                      size={70}
                      colorScheme={review.color}
                    />
                    <div 
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r ${review.color} ring-2 ring-slate-800 shadow-lg`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-white mb-1">{review.name}</h3>
                    <p className="text-slate-300 text-sm font-medium">{review.role}</p>
                    <p className="text-slate-400 text-xs">{review.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <StarRating rating={review.rating} />

                {/* Review Text */}
                <p className="text-slate-200 leading-relaxed text-base font-medium">
                  "{review.review}"
                </p>

                {/* Hover Effect Overlay */}
                <div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${review.color} opacity-0 transition-opacity duration-300 pointer-events-none ${
                    hoveredCard === review.id ? 'opacity-5' : ''
                  }`}
                />

                {/* Subtle Inner Glow */}
                <div 
                  className={`absolute inset-0 rounded-2xl ring-1 ring-inset transition-all duration-300 pointer-events-none ${
                    hoveredCard === review.id ? 'ring-blue-400/20' : 'ring-transparent'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button variant="primary" size="large" className="shadow-2xl shadow-blue-500/20">
            Join thousands of satisfied customers
          </Button>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }
        
        .card-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.5s;
        }
        
        .card-shimmer:hover::before {
          left: 100%;
        }
        
        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ReviewsComponent;