const CART_STORAGE_KEY = 'vinyl_haven_cart';

// Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Add item to cart
export const addToCart = (record, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.record.id === record.id);

  if (existingItemIndex !== -1) {
    // Item already exists, update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({ record, quantity });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Remove item from cart
export const removeFromCart = (recordId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.record.id !== recordId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
};

// Update item quantity
export const updateCartItemQuantity = (recordId, quantity) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.record.id === recordId);

  if (existingItemIndex !== -1 && quantity > 0) {
    cart[existingItemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

// Calculate cart total
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + (item.record.price * item.quantity);
  }, 0);
};

// Get total items count
export const getCartItemsCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Export CartItem as an object structure
export const CartItem = {
  record: {
    id: Number,
    title: String,
    artist: String,
    cover: String,
    price: Number,
  },
  quantity: Number,
};