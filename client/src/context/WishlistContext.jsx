import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./Authcontext"; 
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  
  // Grab the user from AuthContext so we know when they log in/out
  const { user } = useContext(AuthContext);

  // 1. Fetch wishlist from database when user logs in
  useEffect(() => {
    if (!user) {
      setWishlist([]); // Clear wishlist on logout
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // A. Get the array of saved Property IDs from the User Service
        const idRes = await axios.get("http://localhost:5000/api/auth/wishlist", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const propertyIds = idRes.data;

        if (propertyIds.length === 0) {
          setWishlist([]);
          return;
        }

        // B. Get the full property details from the Property Service
        const detailRes = await axios.post("http://localhost:5000/api/properties/wishlist-details", {
          propertyIds: propertyIds
        });
        
        setWishlist(detailRes.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]); // Re-run whenever 'user' changes

  // 2. Add Item (Syncs with DB)
  const addToWishlist = async (property) => {
    if (!user) {
      toast.error("Please login first to save properties!");
      return;
    }

    if (user.role === "owner") {
      toast.error("Only buyers can add properties to a wishlist.");
      return;
    }

    const exists = wishlist.find((item) => item._id === property._id);
    if (exists) {
      toast.error("Property is already in your wishlist.");
      return;
    }

    // Optimistic UI Update: Instantly add to state so it feels fast
    setWishlist((prev) => [...prev, property]);
    toast.success("Added to Wishlist! 🤍");

    try {
      const token = localStorage.getItem("token");
      // Tell backend to add it (Toggles it on)
      await axios.post(`http://localhost:5000/api/auth/wishlist/${property._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      // If server fails, revert the optimistic update
      setWishlist((prev) => prev.filter((item) => item._id !== property._id));
      toast.error("Failed to save to database. Please try again.");
    }
  };

  // 3. Remove Item (Syncs with DB)
  const removeFromWishlist = async (id) => {
    if (!user) return;

    // Save item temporarily in case the API fails and we need to revert
    const removedItem = wishlist.find(item => item._id === id);
    
    // Optimistic UI Update
    setWishlist((prev) => prev.filter((item) => item._id !== id));
    toast.success("Removed from Wishlist");

    try {
      const token = localStorage.getItem("token");
      // Tell backend to remove it (Toggles it off)
      await axios.post(`http://localhost:5000/api/auth/wishlist/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      // Revert if API fails
      if (removedItem) setWishlist((prev) => [...prev, removedItem]);
      toast.error("Failed to remove. Please try again.");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}