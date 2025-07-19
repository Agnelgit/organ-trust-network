import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, Hospital, UserCheck } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">LifeChain</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#security" className="text-muted-foreground hover:text-primary transition-colors">
              Security
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="medical" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#security" className="text-muted-foreground hover:text-primary transition-colors">
                Security
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button variant="medical" size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;