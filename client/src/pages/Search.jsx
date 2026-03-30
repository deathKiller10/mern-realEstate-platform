import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PropertySkeleton from "../components/PropertySkeleton"; // 1. Import Skeleton

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // 2. Add loading state
  
  const location = useLocation();
  const navigate = useNavigate();

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
        `http://localhost:5000/api/properties/search?query=${query}`
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
                src={`http://localhost:5000/${item.images?.[0]}`}
                alt={item.title}
                className="w-full h-44 object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image+Available" }} 
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