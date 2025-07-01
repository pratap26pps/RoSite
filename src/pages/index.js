import LoginModal from "../components/Auth/ LoginModal";
import YoutubeTrust from "./youtube";
import HeroSection from "../components/HeroSection";
import ChooseProductSection from "../components/ChooseProductSection";
import PromoOffers from "../components/PromocodeBanner";
export default function Home() {
  return (
    <div>
      <LoginModal />
      <HeroSection />
      <ChooseProductSection />
      <YoutubeTrust/>   
      <PromoOffers /> 
     </div>
  );
}
