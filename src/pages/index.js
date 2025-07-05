 
import YoutubeTrust from "./youtube";
import HeroSection from "../components/HeroSection";
import ChooseProductSection from "../components/ChooseProductSection";
import PromoOffers from "../components/PromocodeBanner";
import { CarouselSize } from "../components/ProductCard";
import TopSellingProducts from "../components/Sellingproductcard";
import Testimonials from "../components/Testimonial";
export default function Home() {
  return (
    <div>
     
      <HeroSection />
      <ChooseProductSection />
      <CarouselSize />
      <TopSellingProducts />
      <YoutubeTrust/>  
      <Testimonials /> 
      <PromoOffers /> 
     </div>
  );
}
