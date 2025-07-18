import { Card } from '@/components/ui/card';
import { CheckCircle, UserPlus, Search, Shield, Zap, Globe } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Secure Registration',
      description: 'Create your verified profile with KYC validation and medical record verification',
      icon: UserPlus,
      color: 'text-primary'
    },
    {
      number: '02',
      title: 'Smart Matching',
      description: 'Our AI-powered blockchain system automatically finds compatible matches based on medical data',
      icon: Search,
      color: 'text-success'
    },
    {
      number: '03',
      title: 'Verification Process',
      description: 'Multi-layer verification ensures authenticity and medical compatibility',
      icon: Shield,
      color: 'text-warning'
    },
    {
      number: '04',
      title: 'Coordination',
      description: 'Seamless coordination between hospitals, donors, and recipients for successful transplants',
      icon: CheckCircle,
      color: 'text-destructive'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time matching with instant notifications when compatible donors are found'
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable medical records stored securely on BNB Chain with privacy protection'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with verified hospitals and medical centers worldwide for organ matching'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How LifeChain Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our blockchain-powered platform streamlines the organ donation process 
            with transparency, security, and efficiency at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="relative">
                <Card className="p-6 text-center h-full bg-background shadow-card-medical hover:shadow-medical transition-all duration-300">
                  <div className="space-y-4">
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-full bg-primary/10 ${step.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
                
                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary/30"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary/30 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Platform Features */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Choose LifeChain?
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/10">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;