import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/40 z-10"
        />
        <img 
          src="https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=2874&auto=format&fit=crop" 
          alt="Record collection" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="relative z-20 flex flex-col justify-center h-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl animate-fade-in">
          <span className="inline-block mb-3 text-sm font-medium tracking-wider text-primary/90 uppercase">
            Analog Sound. Digital Convenience.
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Discover the Authentic Sound of Vinyl Records
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Curated selection of new releases and classic albums from artists you love, delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/records" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium transition-all hover:bg-secondary/80"
            >
              About Our Store
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}