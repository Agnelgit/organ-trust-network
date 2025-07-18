import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-light" />
              <span className="text-xl font-bold">LifeChain</span>
            </div>
            <p className="text-background/80 text-sm">
              Revolutionizing organ donation through blockchain technology, 
              creating a transparent and efficient system that saves lives.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-primary-light">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-primary-light">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-primary-light">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-primary-light transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">For Patients</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">For Donors</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">For Hospitals</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Verification Process</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-primary-light transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Security & Privacy</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Medical Guidelines</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Support Center</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-background/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@lifecha.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Global Network</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent border-primary-light text-primary-light hover:bg-primary-light hover:text-foreground">
              Emergency Contact
            </Button>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-background/60">
            © 2024 LifeChain. All rights reserved. Powered by BNB Chain.
          </p>
          <div className="flex space-x-6 text-sm text-background/60 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-light transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-light transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;