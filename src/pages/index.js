import LoginModal from "../components/Auth/ LoginModal";
import YoutubeTrust from "./youtube";
import HeroSection from "../components/HeroSection";
import ChooseProductSection from "../components/ChooseProductSection";
export default function Home() {
  return (
    <div>
      <LoginModal />
      <HeroSection />
      <ChooseProductSection />
      <YoutubeTrust/>    
     </div>
  );
}
