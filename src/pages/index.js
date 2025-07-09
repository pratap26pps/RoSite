 
import YoutubeTrust from "./youtube";
import HeroSection from "../components/HeroSection";
import PromoOffers from "../components/PromocodeBanner";
import { CarouselSize } from "../components/ProductCard";
import TopSellingProducts from "../components/Sellingproductcard";
import Testimonials from "../components/Testimonial";
export default function Home() {
  return (
    <div >
     
      <HeroSection />
      <CarouselSize />
      <TopSellingProducts />
      <YoutubeTrust/>  
      <Testimonials /> 
      <PromoOffers /> 
     </div>
  );
}
