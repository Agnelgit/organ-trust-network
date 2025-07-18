import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Hospital, UserCheck, ArrowRight } from 'lucide-react';

const UserTypeSelector = () => {
  const userTypes = [
    {
      id: 'patient',
      title: 'Patient/Recipient',
      description: 'I need an organ transplant and am looking for a compatible donor',
      icon: Heart,
      features: ['Medical history tracking', 'Priority matching', 'Progress monitoring', 'Hospital coordination'],
      color: 'bg-destructive/10 hover:bg-destructive/20 border-destructive/20',
      iconColor: 'text-destructive'
    },
    {
      id: 'donor',
      title: 'Organ Donor',
      description: 'I want to register as an organ donor to help save lives',
      icon: UserCheck,
      features: ['Secure profile creation', 'Compatibility matching', 'Impact tracking', 'Privacy protection'],
      color: 'bg-success/10 hover:bg-success/20 border-success/20',
      iconColor: 'text-success'
    },
    {
      id: 'hospital',
      title: 'Hospital/Medical Center',
      description: 'We manage organ transplant programs and patient care',
      icon: Hospital,
      features: ['Patient management', 'Donor verification', 'Medical records access', 'Transplant coordination'],
      color: 'bg-primary/10 hover:bg-primary/20 border-primary/20',
      iconColor: 'text-primary'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our blockchain-powered organ donation network. Select your role to get started 
            with features tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.id} className={`p-8 transition-all duration-300 cursor-pointer ${type.color} shadow-card-medical hover:shadow-medical`}>
                <div className="text-center space-y-6">
                  <div className={`inline-flex p-4 rounded-full bg-background shadow-medical`}>
                    <IconComponent className={`h-8 w-8 ${type.iconColor}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {type.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Key Features:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="medical" 
                    className="w-full group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All user types undergo KYC verification and medical validation for platform security
          </p>
          <Button variant="outline">
            Learn About Our Verification Process
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelector;