
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { CartItem, getCart, updateCartItemQuantity, removeFromCart, getCartTotal } from "@/utils/cartUtils";  // Import CartItem and cart functions
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (recordId, newQuantity) => {
    if (newQuantity < 1) return;

    updateCartItemQuantity(recordId, newQuantity);
    setCartItems(getCart());
  };

  const handleRemoveItem = (recordId) => {
    removeFromCart(recordId);
    setCartItems(getCart());

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. This is a demo, so no actual payment was processed.",
      });

      // Clear cart in actual implementation
      setIsCheckingOut(false);
    }, 1500);
  };

  const cartTotal = getCartTotal();
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="bg-secondary/50 rounded-lg p-10 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any vinyl records to your cart yet.
          </p>
          <Link
            to="/records"
            className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Records
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-10">
      <Link
        to="/records"
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.record.price);

              return (
                <div key={item.record.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img
                      src={item.record.cover}
                      alt={item.record.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <Link
                          to={`/records/${item.record.id}`}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {item.record.title}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.record.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${item.record.title} from cart`}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.record.artist}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.record.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.record.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">{formattedPrice}</div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {item.quantity} × ${item.record.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setCartItems([]);
              toast({
                title: "Cart cleared",
                description: "All items have been removed from your cart.",
              });
            }}
            className="flex items-center text-sm text-muted-foreground hover:text-destructive mt-4 transition-colors"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear cart
          </button>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-border pt-3 mb-6">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{formattedTotal}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90 disabled:opacity-70 mb-4"
          >
            {isCheckingOut ? (
              <span>Processing...</span>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Checkout
              </>
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            This is a demo store. No payment will be processed and no records will be shipped.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;