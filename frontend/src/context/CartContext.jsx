import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const CART_STORAGE_KEY = "ecommerce_cart";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Cart load error:", err);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Cart save error:", err);
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: product.price,
              }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

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
        cartCount,   // navbar badge
        cartTotal,   // quick total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};