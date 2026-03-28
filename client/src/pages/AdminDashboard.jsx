import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'properties'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, propRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", { headers }),
        axios.get("http://localhost:5000/api/properties") // Public route, no token needed to view
      ]);

      setUsers(usersRes.data);
      setProperties(propRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      alert("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (id, currentStatus) => {
    if (currentStatus) {
        alert("User is already blocked.");
        return;
    }
    if (!window.confirm("Are you sure you want to block this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/admin/block-user/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: true } : u));
      alert("User blocked successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to block user.");
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to DELETE this property?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/delete-property/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(p => p._id !== id));
      alert("Property deleted.");
    } catch (error) {
      alert("Failed to delete property.");
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading Admin Portal...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 border-b pb-4">Admin Control Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Manage Users
        </button>
        <button 
          onClick={() => setActiveTab("properties")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === "properties" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Manage Properties
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl shadow overflow-x-auto border">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4"><span className="uppercase text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">{user.role}</span></td>
                  <td className="p-4">
                    {user.isBlocked ? <span className="text-red-600 font-bold">Blocked</span> : <span className="text-green-600 font-bold">Active</span>}
                  </td>
                  <td className="p-4">
                    {user.role !== "admin" && (
                      <button 
                        onClick={() => handleBlockUser(user._id, user.isBlocked)}
                        disabled={user.isBlocked}
                        className={`px-4 py-1 rounded font-semibold text-white ${user.isBlocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === "properties" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border">
              <img
                src={`http://localhost:5000/${item.images?.[0]}`}
                alt={item.title}
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg truncate mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.location}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="font-bold text-blue-600">₹ {item.price.toLocaleString("en-IN")}</span>
                  <button 
                    onClick={() => handleDeleteProperty(item._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded font-semibold transition"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}