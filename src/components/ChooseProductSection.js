import Image from "next/image";

export default function ChooseProductSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around">
        {/* Left: Cooler Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          
          <Image
            src="/images/image.png"
            alt="Cooler"
            width={300}
            height={400}
            className="z-10"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            CHOOSE COOLER OR <span className="text-blue-500">WATER PUMP</span>
          </h2>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-6">
            Available to order
          </p>

          <div className="mb-6">
            <p className="text-pink-500 text-3xl font-bold">&gt; 62</p>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              kinds of floor and desktop coolers
            </h4>
            <p className="text-gray-600">
              Our refreshing purified bottled water can now be delivered
              directly to your door with our water delivery service.
            </p>
          </div>

          <div className="mb-8">
            <p className="text-pink-500 text-3xl font-bold">&gt; 30</p>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              types of pumps and accessories
            </h4>
            <p className="text-gray-600">
              Vestibulum vitae leo at felis semper lacinia. Vivamus quis turpis
              eget dui faucibus eleifend.
            </p>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-full hover:opacity-90 transition">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
