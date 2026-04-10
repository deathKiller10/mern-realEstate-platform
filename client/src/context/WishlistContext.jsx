import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [userKey, setUserKey] = useState(null);

  //  Get current user key
  const getUserKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? `wishlist_${user.email}` : null;
  };

  useEffect(() => {
  const interval = setInterval(() => {
    const key = getUserKey();

    setUserKey((prevKey) => {
      if (prevKey !== key) {
        return key; // update only if changed
      }
      return prevKey;
    });
  }, 500); 

  return () => clearInterval(interval);
  }, []);

  //  Load wishlist when user changes
  useEffect(() => {
    if (!userKey) {
      setWishlist([]);
      return;
    }

    const saved = JSON.parse(localStorage.getItem(userKey)) || [];
    setWishlist(saved);
  }, [userKey]);

  //  Save wishlist per user
  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(wishlist));
    }
  }, [wishlist, userKey]);

  //  Add item (with protection)
  const addToWishlist = (property) => {
    if (!userKey) {
      alert("Please login first");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === property._id);
      if (exists) return prev;
      return [...prev, property];
    });
  };

  //  Remove item (with protection)
  const removeFromWishlist = (id) => {
    if (!userKey) return;

    setWishlist((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}