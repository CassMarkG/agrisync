import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DashboardSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
