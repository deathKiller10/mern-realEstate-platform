import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PropertySkeleton from "../components/PropertySkeleton";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/Authcontext";
import toast from "react-hot-toast";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // 2. Add loading state
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties/search?query=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h2>

      {/* 3. Conditional Rendering: Skeletons -> Data -> Empty State */}
      {loading ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <PropertySkeleton />
          <PropertySkeleton />
          <PropertySkeleton />
          <PropertySkeleton />
          <PropertySkeleton />
          <PropertySkeleton />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No properties found matching your search.
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={
                  item.images?.[0] 
                    ? item.images[0] 
                    : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
                }
                alt={item.title}
                className="w-full h-44 object-cover"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"; 
                }} 
              />

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate w-3/4">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${item.type === 'rent' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                    For {item.type}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-2">{item.location}</p>

                <p className="text-blue-600 font-bold mt-2 text-xl">
                  ₹ {item.price.toLocaleString("en-IN")}
                </p>

                {(!user || user.role === "buyer") && (
                  <button
                    onClick={() => {
                      if (!user) {
                        toast.error("Please login first to save properties!");
                        return;
                      }
                      addToWishlist(item);
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold mb-2"
                  >
                    Add to Wishlist
                  </button>
                )}

                <button 
                  onClick={() => navigate(`/property/${item._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;