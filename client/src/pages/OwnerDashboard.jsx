import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import toast from 'react-hot-toast';
import PropertySkeleton from "../components/PropertySkeleton";
import axios from "axios";

export default function OwnerDashboard() {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/properties/my-properties", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties", error);
      toast.error("Failed to load your properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    // We keep window.confirm because it's a safe block before a destructive action
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    const toastId = toast.loading('Deleting property...');
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMyProperties(myProperties.filter((p) => p._id !== id));
      toast.success("Property deleted successfully.", { id: toastId });
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete property", { id: toastId });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.loading('Updating status...');
    
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/properties/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMyProperties(myProperties.map((p) => p._id === id ? { ...p, status: newStatus } : p));
      toast.success("Status updated!", { id: toastId });
      
    } catch (error) {
      // THE OPTIMISTIC LOCKING CHECK
      if (error.response?.status === 409) {
        toast.error("Someone else just updated this property! Refreshing data...", {
          id: toastId,
          icon: '🔄',
          duration: 5000
        });
        // Reload to get the latest database state
        fetchProperties(); 
      } else {
        toast.error(error.response?.data?.message || "Failed to update status", { id: toastId });
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[70vh]">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-900">My Listings</h1>
        </div>
        {/* Display 3 pulsing skeleton cards while loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertySkeleton />
          <PropertySkeleton />
          <PropertySkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[70vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">My Listings</h1>
        <NavLink to="/ownerdetails" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow-sm w-full sm:w-auto text-center">
          + Add New Property
        </NavLink>
      </div>

      {myProperties.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border">
          <span className="text-5xl mb-4 block">🏠</span>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">You haven't listed any properties yet!</h2>
          <p className="text-gray-500 mb-6">Start adding your properties to reach potential buyers and renters.</p>
          <NavLink to="/ownerdetails" className="text-blue-600 hover:text-blue-800 font-semibold underline">
            Click here to add your first property
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperties.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border">
              <img 
                // 1. Fix Windows backslashes (\) by converting them to forward slashes (/)
                src={
                  item.images?.[0] 
                    ? `http://localhost:5000/${item.images[0].replace(/\\/g, "/")}` 
                    : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
                } 
                alt={item.title} 
                className="w-full h-48 object-cover bg-gray-100" 
                onError={(e) => { 
                  // 2. CRITICAL: Nullify the error handler so it can NEVER infinite loop
                  e.target.onerror = null; 
                  // 3. Use a highly reliable fallback image instead of placeholder.com
                  e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"; 
                }} 
              />
              <div className="p-5">
                <h3 className="font-bold text-xl truncate mb-1" title={item.title}>{item.title}</h3>
                <p className="text-blue-600 font-bold text-lg mb-4">₹ {item.price.toLocaleString("en-IN")}</p>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded border">
                    <span className="text-sm font-semibold text-gray-600">Status:</span>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusChange(item._id, e.target.value)} 
                      className="text-sm font-bold border-none bg-transparent cursor-pointer focus:ring-0 text-gray-800"
                    >
                      <option value="available">🟢 Available</option>
                      <option value="rented">🟠 Rented</option>
                      <option value="sold">🔴 Sold</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <NavLink to={`/property/${item._id}`} className="flex-1 bg-blue-50 text-blue-700 border border-blue-200 text-center py-2 rounded font-semibold hover:bg-blue-100 transition">View Details</NavLink>
                    <button onClick={() => handleDelete(item._id)} className="flex-1 bg-red-50 text-red-700 border border-red-200 py-2 rounded font-semibold hover:bg-red-100 transition">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}