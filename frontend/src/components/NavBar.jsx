import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled ? "backdrop-blur-sm bg-white/70 border border-white/20 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary"
        >
          <Music className="h-8 w-8" />
          <span className="text-xl font-medium hidden sm:inline">Vinyl Haven</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/records" active={location.pathname.startsWith('/records')}>Records</NavLink>
        </nav>
        
        <div className="flex items-center space-x-5">
          <Link to="/search" className="p-2 text-primary hover:text-primary/80 transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="p-2 text-primary hover:text-primary/80 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link to="/login" className="p-2 text-primary hover:text-primary/80 transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <button 
            className="md:hidden p-2 text-primary" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 flex flex-col pt-20 px-6",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-6 text-lg">
          <MobileNavLink to="/" active={location.pathname === '/'}>Home</MobileNavLink>
          <MobileNavLink to="/records" active={location.pathname.startsWith('/records')}>Records</MobileNavLink>
          <MobileNavLink to="/about" active={location.pathname === '/about'}>About</MobileNavLink>
          <MobileNavLink to="/login" active={location.pathname === '/login'}>Login</MobileNavLink>
          <MobileNavLink to="/cart" active={location.pathname === '/cart'}>Cart</MobileNavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "text-sm font-medium transition-colors relative",
        active ? "text-primary" : "text-primary/70 hover:text-primary",
        "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
        active && "after:scale-x-100 after:origin-bottom-left"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, children }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "text-xl py-2 font-medium transition-colors relative",
        active ? "text-primary" : "text-primary/70"
      )}
    >
      {children}
    </Link>
  );
}