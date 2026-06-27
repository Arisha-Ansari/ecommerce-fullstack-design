import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Har component mein useContext(CartContext) likhne ki zaroorat nahi
// bas useCart() call karo
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
};

export default useCart;