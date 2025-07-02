import LoginModal from "../components/Auth/ LoginModal";
import YoutubeTrust from "./youtube";
import HeroSection from "../components/HeroSection";
import ChooseProductSection from "../components/ChooseProductSection";
import PromoOffers from "../components/PromocodeBanner";
import { CarouselSize } from "../components/ProductCard";
import TopSellingProducts from "../components/Sellingproductcard";
export default function Home() {
  return (
    <div>
      <LoginModal />
      <HeroSection />
      <ChooseProductSection />
      <CarouselSize />
      <TopSellingProducts />
      <YoutubeTrust/>   
      <PromoOffers /> 
     </div>
  );
}
