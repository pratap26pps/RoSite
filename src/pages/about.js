 
import React, { useState, useEffect } from 'react';
import { Youtube, Droplets, Shield, Zap, Award, Users, Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const brands = [
    {
      name: "KENT",
      logo:  <Award className="w-10 h-10 text-blue-400 mx-auto mb-4" />,
      description: "Pioneer in water purification technology with innovative RO+UV+UF systems.",
      features: [
        "Advanced RO+UV+UF Technology",
        "TDS Controller for Essential Minerals",
        "UV LED Purification",
        "Smart Digital Display",
        "Food Grade Plastic Construction"
      ],
      topModel: "Kent Grand Plus",
      modelFeatures: "11-stage purification, 8L storage, Zero Water Wastage"
    },
    {
      name: "AQUAGUARD",
      logo: <Droplets className="w-10 h-10 text-cyan-300 mx-auto mb-4" />,
      description: "India's most trusted water purifier brand with 30+ years of excellence.",
      features: [
        "Biotron Technology",
        "Active Copper Technology",
        "Mineral Guard Technology",
        "e-boiling+ Technology",
        "Smart Plus Technology"
      ],
      topModel: "Aquaguard Blaze",
      modelFeatures: "Hot, Warm & Normal Water, 7L storage, Copper + Zinc"
    },
    {
      name: "LIVPURE",
      logo:<Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />,
      description: "Modern water purification with cutting-edge technology and sleek design.",
      features: [
        "7-Stage Purification Process",
        "Copper 29 Technology",
        "In-Tank UV Sterilization",
        "Smart Indicators",
        "Taste Enhancer Technology"
      ],
      topModel: "Livpure Glo Pro++",
      modelFeatures: "7-stage purification, 7L storage, Copper + Minerals"
    }
  ];

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Expert Installation",
      description: "Professional RO system installation with proper setup and configuration"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Maintenance & Repair",
      description: "Regular maintenance, filter replacement, and system troubleshooting"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Consultation",
      description: "Water quality assessment and customized purification solutions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Support",
      description: "24/7 technical support and guidance from certified experts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-x-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Droplets className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              RO Technical Experts
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Your Trusted Water Purification Specialists
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">500+</div>
              <div className="text-gray-300">Installations</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">1000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Learn More
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            id="about-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['about-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              About Us
            </h2>
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-500/30">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Welcome to RO Technical Experts, your premier destination for comprehensive water purification solutions. 
                With over a decade of experience in the water treatment industry, we specialize in providing expert guidance, 
                installation, and maintenance services for top-tier RO water purification systems.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Our team of certified technicians brings unparalleled expertise in reverse osmosis technology, ensuring 
                that you receive the purest, safest drinking water for your home and family. We are committed to 
                delivering excellence in every service we provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Featured Brands & Top Models
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                id={`brand-${index}`}
                data-animate
                className={`group bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 ${
                  isVisible[`brand-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{brand.logo}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-400 group-hover:text-cyan-300 transition-colors">
                    {brand.name}
                  </h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {brand.description}
                </p>

                <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 mb-6 border border-cyan-500/30">
                  <h4 className="font-bold text-cyan-400 mb-2">Top Model: {brand.topModel}</h4>
                  <p className="text-gray-300 text-sm">{brand.modelFeatures}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-400 mb-3">Key Features:</h4>
                  {brand.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            id="youtube-section"
            data-animate
            className={`bg-gradient-to-r from-red-900/40 to-pink-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-red-500/30 transition-all duration-1000 ${
              isVisible['youtube-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Youtube className="w-16 h-16 mx-auto mb-6 text-red-400 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-300 bg-clip-text text-transparent">
              Learn More on YouTube
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Join our community of water purification enthusiasts! Get expert tips, detailed product reviews, 
              installation guides, and troubleshooting solutions from our certified RO technicians.
            </p>
            <p className="text-gray-300 mb-8">
              Subscribe for the latest updates on water purification technology, maintenance tips, and comprehensive brand comparisons.
            </p>
            <a
              href="https://www.youtube.com/@rotechnicalxperts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            >
              <Youtube className="w-5 h-5" />
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`service-${index}`}
                data-animate
                className={`bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 text-center ${
                  isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            id="contact-section"
            data-animate
            className={`bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-500/30 transition-all duration-1000 ${
              isVisible['contact-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Ready to transform your water quality? Contact our experts today for personalized consultation and service.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30">
                <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-blue-400 mb-2">Call Us</h3>
                <p className="text-gray-300">+91 XXXXX XXXXX</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-blue-400 mb-2">Email Us</h3>
                <p className="text-gray-300">info@rotechnicalexperts.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-500/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              RO Technical Experts
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 RO Technical Experts. All rights reserved. | Pure Water, Pure Life.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;