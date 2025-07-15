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
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Droplets className="w-16 h-16 mx-auto mb-4 text-blue-500  " />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            RO Technical Experts
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your Trusted Water Purification Specialists
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-700">Installations</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">10+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-700">Happy Customers</div>
            </div>
          </div>

          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Learn More
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              About Us
            </h2>
            <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-200">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Welcome to RO Technical Experts, your premier destination for comprehensive water purification solutions. 
                With over a decade of experience in the water treatment industry, we specialize in providing expert guidance, 
                installation, and maintenance services for top-tier RO water purification systems.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Our team of certified technicians brings unparalleled expertise in reverse osmosis technology, ensuring 
                that you receive the purest, safest drinking water for your home and family. We are committed to 
                delivering excellence in every service we provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            id="youtube-section"
            data-animate
            className={`bg-red-50 rounded-3xl p-8 md:p-12 border border-red-200 transition-all duration-1000 ${
              isVisible['youtube-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Youtube className="w-16 h-16 mx-auto mb-6 text-red-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text text-transparent">
              Learn More on YouTube
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Join our community of water purification enthusiasts! Get expert tips, detailed product reviews, 
              installation guides, and troubleshooting solutions from our certified RO technicians.
            </p>
            <p className="text-gray-700 mb-8">
              Subscribe for the latest updates on water purification technology, maintenance tips, and comprehensive brand comparisons.
            </p>
            <a
              href="https://www.youtube.com/@rotechnicalxperts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`service-${index}`}
                data-animate
                className={`bg-blue-50 rounded-2xl p-6 border border-blue-200 hover:border-blue-400 transition-all duration-500 hover:scale-105 shadow-sm text-center ${
                  isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">{service.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
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
            className={`bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-200 transition-all duration-1000 ${
              isVisible['contact-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Ready to transform your water quality? Contact our experts today for personalized consultation and service.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-100 rounded-2xl p-6 border border-blue-200">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-blue-600 mb-2">Call Us</h3>
                <p className="text-gray-700">+91 XXXXX XXXXX</p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-6 border border-blue-200">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-blue-600 mb-2">Email Us</h3>
                <p className="text-gray-700">info@rotechnicalexperts.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              RO Technical Experts
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 RO Technical Experts. All rights reserved. | Pure Water, Pure Life.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
