 import { Truck, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WaterDeliverySection() {
  return (
    <section className="bg-[#f9fbff] p-6 sm:p-12  shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Image Section */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="p-4 relative z-10">
            <img
              src="https://wavio.peerduck.com/wp-content/uploads/2020/12/Group-69-7.png"  
              alt="Water Delivery"
              width={500}
              height={500}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 space-y-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-black">
            DELIVERY <span className="text-blue-500">SERVICE</span>
          </h2>
          <p className="text-gray-600">
            Our refreshing purified bottled water can now be delivered directly to your door
            with our water delivery service.
          </p>

          {/* Service Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-black">FREE DELIVERY</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-black">7 DAYS A WEEK</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className= "w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-black">8:00 - 23:00</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base px-6 py-3 rounded-full">
              Order Now
            </Button>
            <Button
              variant="outline"
              className="text-blue-500 border-blue-500 px-6 py-3 rounded-full text-base"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
