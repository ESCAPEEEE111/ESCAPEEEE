import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { name: 'HOME', path: '/' },
    { name: 'PLATFORM', path: '/platform' },
    { name: 'SERVICES', path: '/services' },
    { name: 'AI_SOLVER', path: '/ai-solver' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-matrix-green/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold font-mono text-matrix-green group-hover:text-matrix-bright-cyan transition-colors">
              🌐 NOWHERE
            </div>
            <div className="text-sm font-mono text-matrix-green/60 group-hover:text-matrix-cyan/80 transition-colors">
              DIGITAL_MATRIX
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-mono text-sm transition-colors duration-300 hover:text-matrix-bright-cyan ${
                  location.pathname === item.path
                    ? 'text-matrix-bright-cyan'
                    : 'text-matrix-green'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/ai-solver">
              <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold px-6 py-2 text-sm">
                🧠 AI_ANALYSIS
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-matrix-green hover:text-matrix-bright-cyan transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-matrix-green/20 mt-4 rounded-lg">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 font-mono text-base transition-colors duration-300 hover:text-matrix-bright-cyan hover:bg-matrix-green/10 rounded ${
                    location.pathname === item.path
                      ? 'text-matrix-bright-cyan bg-matrix-green/20'
                      : 'text-matrix-green'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-3 py-4 border-t border-matrix-green/20 mt-4">
                <Link to="/ai-solver" className="block">
                  <Button className="w-full bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold py-3">
                    🧠 GET_AI_ANALYSIS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;