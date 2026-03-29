import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyProperties(myProperties.filter((p) => p._id !== id));
      alert("Property deleted.");
    } catch (error) {
      alert("Failed to delete property");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/properties/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyProperties(myProperties.map((p) => p._id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[70vh]">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-900">My Listings</h1>
        <NavLink to="/ownerdetails" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition">
          + Add New Property
        </NavLink>
      </div>

      {myProperties.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center border">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">You haven't listed any properties yet!</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperties.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border">
              <img src={`http://localhost:5000/${item.images?.[0]}`} alt={item.title} className="w-full h-48 object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }} />
              <div className="p-5">
                <h3 className="font-bold text-xl truncate mb-1">{item.title}</h3>
                <p className="text-blue-600 font-bold text-lg mb-4">₹ {item.price.toLocaleString("en-IN")}</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                    <span className="text-sm font-semibold text-gray-600">Status:</span>
                    <select value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)} className="text-sm font-bold border-none bg-transparent cursor-pointer">
                      <option value="available">Available</option>
                      <option value="rented">Rented</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <NavLink to={`/property/${item._id}`} className="flex-1 bg-blue-100 text-blue-700 text-center py-2 rounded font-semibold hover:bg-blue-200">View</NavLink>
                    <button onClick={() => handleDelete(item._id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded font-semibold hover:bg-red-200">Delete</button>
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