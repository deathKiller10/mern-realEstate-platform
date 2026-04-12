import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { 
  Heart, 
  MapPin, 
  IndianRupee, 
  Trash2, 
  Home,
  ArrowRight,
  Sparkles,
  Bed,
  Bath,
  Square,
  Eye
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Your Wishlist</h1>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-lg">
              {wishlist.length === 0 
                ? "Save your favorite properties and come back to them anytime" 
                : `You have ${wishlist.length} saved ${wishlist.length === 1 ? 'property' : 'properties'}`
              }
            </p>
            {wishlist.length > 0 && (
              <div className="hidden md:block">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Last updated just now
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 md:p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-slate-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start exploring properties and save your favorites to compare and review them later.
              </p>
              
              <NavLink 
                to="/properties" 
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span>Save favorites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>Compare easily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-green-500" />
                    <span>Find your dream home</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Property Image with Conditional Overlay */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
                    <img 
                      src={
                        item.images?.[0]
                          ? `http://localhost:5000/${item.images[0].replace(/\\/g, "/")}` 
                          : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
                      } 
                      alt={item.title} 
                      className={`absolute inset-0 w-full h-full object-cover ${item.status === 'sold' ? 'grayscale opacity-60' : ''}`}
                      onError={(e) => { 
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"; 
                      }} 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    
                    {/* NEW: SOLD OUT BADGE */}
                    {item.status === 'sold' && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                        <div className="bg-red-600 text-white font-black text-xl px-6 py-2 rounded-lg border-2 border-white/50 tracking-widest transform -rotate-12 shadow-2xl">
                          SOLD OUT
                        </div>
                        <p className="text-white text-xs mt-2 font-medium bg-black/50 px-3 py-1 rounded-full">
                          No longer available
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Property Details */}
                  <div className="p-5">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-2xl font-bold text-green-600">
                          <IndianRupee className="w-5 h-5" />
                          <span>{item.price?.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">{item.location}</span>
                      </div>
                      
                      {/* Property Features */}
                      <div className="flex items-center gap-4 py-3 border-y border-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Bed className="w-4 h-4" />
                          <span>{item.bhk || "1"} BHK</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Bath className="w-4 h-4" />
                          <span>{item.bathrooms || "2"} Baths</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Square className="w-4 h-4" />
                          <span>{item.area || "1200"} sq.ft</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <NavLink
                        to={item.status === 'sold' ? '#' : `/property/${item._id}`}
                        onClick={(e) => { if (item.status === 'sold') e.preventDefault(); }}
                        className={`flex-1 text-center px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 group/link ${
                          item.status === 'sold' 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <span>{item.status === 'sold' ? 'Unavailable' : 'View Details'}</span>
                        {item.status !== 'sold' && <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />}
                      </NavLink>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="px-4 py-2 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group/btn"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500 group-hover/btn:text-red-600 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <NavLink
                to="/properties"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Continue browsing properties</span>
              </NavLink>
              
              <div className="text-sm text-gray-500">
                <span>{wishlist.length} {wishlist.length === 1 ? 'property' : 'properties'} saved</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;