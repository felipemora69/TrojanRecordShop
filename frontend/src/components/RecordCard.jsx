import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export default function RecordCard({ record, className, featured = false }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(record.price);

  return (
    <div 
      className={cn(
        "record-card group",
        featured ? "overflow-hidden rounded-lg" : "",
        className
      )}
    >
      <Link to={`/records/${record.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={record.cover}
            alt={`${record.title} by ${record.artist}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          featured ? "flex items-end justify-start p-6" : "hidden"
        )}>
          <div className="text-white">
            <h3 className="text-xl font-medium">{record.title}</h3>
            <p className="text-white/80">{record.artist}</p>
          </div>
        </div>
      </Link>
      
      <div className={cn("mt-3", featured ? "hidden" : "block")}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-base line-clamp-1">{record.title}</h3>
            <p className="text-sm text-muted-foreground">{record.artist}</p>
          </div>
          <div className="text-sm font-medium">{formattedPrice}</div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide bg-secondary px-2 py-1 rounded-sm">
            {record.genre}
          </span>
          
          <button 
            className="text-primary p-1.5 rounded-full hover:bg-secondary transition-colors"
            aria-label={`Add ${record.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}