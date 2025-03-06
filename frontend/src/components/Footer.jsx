import { Link } from 'react-router-dom';
import { Music, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary mt-16 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <Music className="h-6 w-6" />
            <span className="text-lg font-medium">Vinyl Haven</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-2 max-w-xs">
            Curating the finest vinyl records for music enthusiasts who appreciate analog sound and timeless artistry.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-primary mb-4">Shop</h3>
          <ul className="space-y-2">
            <FooterLink to="/records">All Records</FooterLink>
            <FooterLink to="/records?genre=rock">Rock</FooterLink>
            <FooterLink to="/records?genre=jazz">Jazz</FooterLink>
            <FooterLink to="/records?genre=electronic">Electronic</FooterLink>
            <FooterLink to="/records?genre=hip-hop">Hip Hop</FooterLink>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-primary mb-4">Company</h3>
          <ul className="space-y-2">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/shipping">Shipping</FooterLink>
            <FooterLink to="/returns">Returns</FooterLink>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-primary mb-4">Connect</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            Subscribe to our newsletter for exclusive offers and new releases.
          </p>
          <form className="mt-2 flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-background border rounded-l-md px-3 py-2 text-sm focus:outline-none w-full"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Vinyl Haven. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

// JSX Version of FooterLink component
function FooterLink({ to, children }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-muted-foreground text-sm hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}