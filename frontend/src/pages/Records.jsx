
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import RecordCard from "@/components/RecordCard";
import { records, genres } from "@/data/records";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const Records = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  
  // Extract genre from URL params
  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      // Capitalize first letter for display
      const formattedGenre = genreParam.charAt(0).toUpperCase() + genreParam.slice(1);
      setSelectedGenre(formattedGenre);
    } else {
      setSelectedGenre("All");
    }
  }, [searchParams]);
  
  // Filter records based on selected genre
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter(
        record => record.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
      setFilteredRecords(filtered);
    }
  }, [selectedGenre]);
  
  // Handle genre selection
  const handleGenreChange = (genre) => {
    if (genre === "All") {
      // Remove genre parameter from URL
      searchParams.delete("genre");
      setSearchParams(searchParams);
    } else {
      // Update URL with selected genre
      setSearchParams({ genre: genre.toLowerCase() });
    }
    setSelectedGenre(genre);
    setShowFilters(false);
  };
  
  return (
    <div className="min-h-screen pb-10">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2671&auto=format&fit=crop" 
            alt="Record collection" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 flex flex-col justify-center h-full px-4 md:px-8 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            {selectedGenre === "All" ? "All Records" : `${selectedGenre} Records`}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            {selectedGenre === "All" 
              ? "Browse our entire collection of quality vinyl records" 
              : `Explore our collection of ${selectedGenre} records`}
          </p>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-2 overflow-x-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap",
                    selectedGenre === genre
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
            
            <button
              className="md:hidden flex items-center space-x-2 bg-secondary px-3 py-1.5 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </button>
            
            <div className="text-sm text-muted-foreground">
              {filteredRecords.length} {filteredRecords.length === 1 ? "record" : "records"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background p-6 transition-all duration-300",
        showFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Filters</h2>
          <button onClick={() => setShowFilters(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Genres</h3>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors text-left",
                    selectedGenre === genre
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Records Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-6">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium mb-2">No records found</h3>
            <p className="text-muted-foreground">
              Try selecting a different genre or check back later for new additions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;