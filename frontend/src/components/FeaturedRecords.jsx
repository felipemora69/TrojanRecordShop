import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RecordCard from "./RecordCard";
import { records } from "@/data/records";

export default function FeaturedRecords() {
  const [featuredRecords, setFeaturedRecords] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API
    setFeaturedRecords(records.slice(0, 8));
  }, []);
  
  return (
    <section className="section-padding py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="animate-slide-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Records</h2>
            <p className="text-muted-foreground max-w-2xl">
              Hand-picked selection of vinyl records from our collection, featuring new releases and timeless classics.
            </p>
          </div>
          <Link 
            to="/records" 
            className="inline-flex items-center text-primary mt-4 md:mt-0 group"
          >
            View all records
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-6">
          {featuredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    </section>
  );
}