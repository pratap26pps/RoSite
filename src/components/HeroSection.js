 

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-[#eaf6fd] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-around pt-24 pb-10">
        {/* Left Content */}
        <div
          className="md:w-1/2 text-center md:text-left"
          data-aos="fade-right"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            SAFE DRINKING <span className="text-blue-500">WATER</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We provide the best water quality insights to ensure your health
            and safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition">
              Our Services
            </button>
            <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
              Discover More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="relative md:w-1/2 flex justify-center"
          data-aos="fade-left"
        >
          <img
            src="https://wavio.peerduck.com/wp-content/uploads/2022/09/Group-447.png"
            alt="Smiling Girl"
            width={600}
            height={600}
            className="z-10"
          />
        </div>
      </div>

      {/* Wave bottom border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.22,22,104.2,36.92,166,40.36,60.69,3.37,125.63-6.61,185-22.26,61.87-16.3,120.76-39.69,185-39.87,61.86-.18,118.7,21.56,180,34.91,48.62,10.48,108,18.27,164,3.86,30.22-7.63,58.62-20.63,84-36.48V0Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}
