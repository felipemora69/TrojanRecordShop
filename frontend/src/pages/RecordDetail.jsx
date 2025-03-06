
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { addToCart } from "@/utils/cartUtils";
import { toast } from "@/hooks/use-toast";
import { records } from "@/data/records";

const RecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // In a real app, fetch the record from an API
    const foundRecord = records.find(r => r.id === id);
    setRecord(foundRecord || null);
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!record) return;

    setIsAdding(true);

    // Simulate network delay
    setTimeout(() => {
      addToCart(record, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${record.title} by ${record.artist} added to your cart.`,
      });
      setIsAdding(false);
    }, 600);
  };

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Record Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The record you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/records"
            className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Records
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(record.price);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Link
          to="/records"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Records
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Record Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img
              src={record.cover}
              alt={`${record.title} by ${record.artist}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Record Details */}
          <div className="flex flex-col">
            <div>
              <span className="inline-block text-sm text-muted-foreground mb-2">
                {record.genre} / {record.year}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{record.title}</h1>
              <h2 className="text-xl text-muted-foreground mb-6">{record.artist}</h2>

              <div className="text-2xl font-medium mb-8">{formattedPrice}</div>

              <div className="prose prose-sm prose-slate mb-8 max-w-none">
                <p>
                  Experience the warm, rich sound of {record.title} on vinyl, as it was meant to be heard. This {record.year} album by {record.artist} features exceptional audio quality and comes with a gatefold sleeve containing original artwork and liner notes.
                </p>
                <p>
                  Each record is carefully inspected to ensure the highest quality listening experience. Perfect for collectors and music enthusiasts who appreciate the authentic analog sound.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center space-x-6 mb-6">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center border border-input rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 hover:bg-secondary transition-colors disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="px-3 py-2 hover:bg-secondary transition-colors disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90 disabled:opacity-70"
                >
                  {isAdding ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="flex-1 inline-flex items-center justify-center bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium transition-all hover:bg-secondary/80"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;