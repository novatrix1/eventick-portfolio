import FeaturesOverviewSection from "@/components/home/FeaturesOverviewSection";
import HeroSection from "@/components/home/HeroSection";
import QuickContactSection from "@/components/home/QuickContactSection";
import SolutionSection from "@/components/home/SolutionSection";

export default function Home() {
  return (
    <>
     <HeroSection />
     <SolutionSection />
     <FeaturesOverviewSection />  
     <QuickContactSection />
    </>
  );
}
