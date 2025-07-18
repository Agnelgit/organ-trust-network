import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import UserTypeSelector from '@/components/UserTypeSelector';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <UserTypeSelector />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
