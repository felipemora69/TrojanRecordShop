
import Hero from "@/components/Hero";
import FeaturedRecords from "@/components/FeaturedRecords";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <FeaturedRecords />
      
      {/* Genres Section */}
      <section className="section-padding py-12 px-4 md:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Browse by Genre</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Rock", "Jazz", "Hip Hop", "Electronic", "Soul", "Pop", "Indie", "Reggae"].map((genre) => (
              <Link 
                key={genre} 
                to={`/records?genre=${genre.toLowerCase()}`}
                className="bg-background p-6 rounded-lg text-center hover:shadow-md transition-shadow animate-slide-up"
              >
                <h3 className="font-medium mb-1">{genre}</h3>
                <span className="text-sm text-muted-foreground">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section className="section-padding py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Authentic Vinyl Experience</h2>
            <p className="text-muted-foreground mb-6">
              At Vinyl Haven, we believe in the timeless quality of vinyl records. Our carefully curated collection brings together the best music across genres, offering both classic albums and new releases for the discerning music lover.
            </p>
            <p className="text-muted-foreground mb-6">
              Every record in our collection is selected for its musical value and pressing quality, ensuring you get the best possible listening experience.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center text-primary group"
            >
              Learn more about us
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2873&auto=format&fit=crop"
                alt="Vinyl record being played" 
                className="w-full h-full object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section-padding py-12 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new releases, and vinyl care tips.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white/10 border border-white/20 rounded-l-md px-4 py-3 text-sm focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-white text-primary px-4 py-3 rounded-r-md font-medium transition-colors hover:bg-white/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;