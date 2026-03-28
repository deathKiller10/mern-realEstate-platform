import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const filtered = properties.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          className="p-2 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="p-2 border rounded-lg w-full md:w-1/4">
          <option>Sort: Price Low → High</option>
          <option>Sort: Price High → Low</option>
        </select>
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        
        {/* Sidebar (Filters) */}
        <div className="hidden md:block w-1/4 bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Filters</h2>

          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Under ₹50L
          </label>

          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            2 BHK
          </label>

          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            3 BHK+
          </label>
        </div>

        {/* Property Grid */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
              src={`http://localhost:5000/${item.images?.[0]}`}
              alt={item.title}
              className="w-full h-44 object-cover"
            />

              <div className="p-3">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.location}</p>

                <p className="text-blue-600 font-bold mt-2">
                  ₹ {item.price}
                </p>

                <button 
                  onClick={() => navigate(`/property/${item._id}`)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}