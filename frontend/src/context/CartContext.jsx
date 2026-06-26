import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const CART_STORAGE_KEY = "ecommerce_cart";

// localStorage se cart load karo (app start hone par)
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Cart load error:", err);
    return [];
  }
};

// Cart ko localStorage mein save karo
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Cart save error:", err);
  }
};

export const CartProvider = ({ children }) => {
  // State initialize karte waqt seedha localStorage se load karo
  const [cart, setCart] = useState(() => loadCartFromStorage());

  // Jab bhi cart change ho, localStorage update karo
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // ── Product add karo ──────────────────────────────────────────
  // ProductDetails se price already bulk-adjusted aata hai
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        // Pehle se hai toh quantity badao, price update karo (tier change ho sakta hai)
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: product.price, // latest bulk price
              }
            : item
        );
      }

      // Naya item add karo
      return [...prev, { ...product, quantity }];
    });
  }, []);

  // ── Quantity update karo ──────────────────────────────────────
  const updateQuantity = useCallback((productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  }, []);

  // ── Item remove karo ─────────────────────────────────────────
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  // ── Poora cart saaf karo ─────────────────────────────────────
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // ── Computed values ───────────────────────────────────────────
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,   // navbar badge ke liye
        cartTotal,   // quick total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};