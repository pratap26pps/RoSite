import Image from "next/image";

export default function ChooseProductSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
        {/* Right: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 leading-tight">
            CHOOSE COOLER OR <span className="text-blue-500">WATER PUMP</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-8">
            Available to order
          </p>

          <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 w-full max-w-md">
            <div className="mb-8 sm:mb-0 sm:pr-8 flex-1">
              <p className="text-pink-500 text-3xl sm:text-4xl font-bold"> 62</p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                kinds of floor and desktop coolers
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Our refreshing purified bottled water can now be delivered
                directly to your door with our water delivery service.
              </p>
            </div>
            <div className="sm:pl-8 flex-1 border-t sm:border-t-0 sm:border-l border-gray-200 pt-8 sm:pt-0">
              <p className="text-pink-500 text-3xl sm:text-4xl font-bold"> 30</p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                types of pumps and accessories
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Vestibulum vitae leo at felis semper lacinia. Vivamus quis turpis
                eget dui faucibus eleifend.
              </p>
            </div>
          </div>

          <button className="mt-10 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 font-semibold text-base sm:text-lg">
            Order Now
          </button>
        </div>

        {/* Left: Cooler Image */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 bg-blue-100 rounded-full blur-2xl opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <Image
            src="/images/image.png"
            alt="Cooler"
            width={320}
            height={420}
            className="rounded-3xl shadow-2xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}