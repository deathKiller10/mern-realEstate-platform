import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const key = currentUser ? `wishlist_${currentUser.email}` : "wishlist_guest";
  const saved = JSON.parse(localStorage.getItem(key)) || [];
  setWishlist(saved);
}, []);
  }, []);

  // Save to localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
  const key = currentUser ? `wishlist_${currentUser.email}` : "wishlist_guest";

  localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (property) => {
    const exists = wishlist.find((item) => item._id === property._id);
    if (!exists) {
      setWishlist([...wishlist, property]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}