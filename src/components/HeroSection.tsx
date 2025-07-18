import { Button } from '@/components/ui/button';
import { Heart, Shield, Clock, Users } from 'lucide-react';
import heroImage from '@/assets/medical-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Medical professionals" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Saving Lives Through
                <span className="block text-primary-light">Blockchain Innovation</span>
              </h1>
              <p className="text-xl text-primary-light/90 max-w-lg">
                A decentralized platform connecting organ donors and recipients with 
                transparency, security, and efficiency that saves lives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="text-primary">
                <Heart className="mr-2 h-5 w-5" />
                Register as Donor
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Find a Match
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-light">100K+</div>
                <div className="text-sm text-primary-light/80">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-light">50+</div>
                <div className="text-sm text-primary-light/80">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-light">24/7</div>
                <div className="text-sm text-primary-light/80">Matching System</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-light">99.9%</div>
                <div className="text-sm text-primary-light/80">Uptime</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <Shield className="h-8 w-8 text-primary-light mb-4" />
              <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
              <p className="text-primary-light/80 text-sm">
                Tamper-proof medical records with end-to-end encryption
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <Clock className="h-8 w-8 text-primary-light mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Matching</h3>
              <p className="text-primary-light/80 text-sm">
                AI-powered compatibility analysis for optimal matches
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <Users className="h-8 w-8 text-primary-light mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Network</h3>
              <p className="text-primary-light/80 text-sm">
                Connect with verified donors and recipients worldwide
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <Heart className="h-8 w-8 text-primary-light mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Profiles</h3>
              <p className="text-primary-light/80 text-sm">
                KYC and medical verification for trusted interactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;