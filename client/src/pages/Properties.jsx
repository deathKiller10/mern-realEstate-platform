// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Properties() {
//   const [properties, setProperties] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/properties")
//       .then((res) => res.json())
//       .then((data) => setProperties(data));
//   }, []);

//   const filtered = properties.filter((item) =>
//     item.location.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-4">Available Properties</h1>

//       {/* Search + Sort */}
//       <div className="flex flex-col md:flex-row gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Search by location..."
//           className="p-2 border rounded-lg w-full md:w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select className="p-2 border rounded-lg w-full md:w-1/4">
//           <option>Sort: Price Low → High</option>
//           <option>Sort: Price High → Low</option>
//         </select>
//       </div>

//       {/* Layout */}
//       <div className="flex gap-6">
        
//         {/* Sidebar (Filters) */}
//         <div className="hidden md:block w-1/4 bg-white p-4 rounded-xl shadow">
//           <h2 className="font-semibold mb-3">Filters</h2>

//           <label className="block mb-2">
//             <input type="checkbox" className="mr-2" />
//             Under ₹50L
//           </label>

//           <label className="block mb-2">
//             <input type="checkbox" className="mr-2" />
//             2 BHK
//           </label>

//           <label className="block mb-2">
//             <input type="checkbox" className="mr-2" />
//             3 BHK+
//           </label>
//         </div>

//         {/* Property Grid */}
//         <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filtered.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >
//               <img
//               src={`http://localhost:5000/${item.images?.[0]}`}
//               alt={item.title}
//               className="w-full h-44 object-cover"
//             />

//               <div className="p-3">
//                 <h2 className="font-semibold text-lg">{item.title}</h2>
//                 <p className="text-gray-500 text-sm">{item.location}</p>

//                 <p className="text-blue-600 font-bold mt-2">
//                   ₹ {item.price}
//                 </p>

//                 <button 
//                   onClick={() => navigate(`/property/${item._id}`)}
//                   className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  
  // 1. ALL YOUR FILTER STATES
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all", "rent", or "sale"
  const [maxPrice, setMaxPrice] = useState(""); 
  const [bhk, setBhk] = useState("all"); 
  const [minArea, setMinArea] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
      } catch (error) {
        console.error("Failed to load properties");
      }
    };
    fetchProperties();
  }, []);

  // 2. THE MASTER FILTER FUNCTION
  // This checks the Search Bar AND the Sidebar states simultaneously
  // 2. THE MASTER FILTER FUNCTION
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
      
    const matchesType = filterType === "all" || p.type === filterType;
    const matchesPrice = maxPrice === "" || p.price <= parseInt(maxPrice);
    
    // === NEW FILTER LOGIC ===
    // If bhk is "all", it passes. Otherwise, check if property bhk matches the dropdown.
    // Note: If you want "4+" to work as greater-than, you'd need slightly different logic, 
    // but strict matching is best for an MVP.
    const matchesBhk = bhk === "all" || p.bhk === parseInt(bhk);
    
    // If minArea is empty, it passes. Otherwise, check if property area is >= the input.
    const matchesArea = minArea === "" || p.area >= parseInt(minArea);

    // Return true only if it passes ALL filters
    return matchesSearch && matchesType && matchesPrice && matchesBhk && matchesArea;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Browse Properties</h1>

      {/* Top Search Bar */}
      <input 
        type="text"
        placeholder="Search by location or title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-8 shadow-sm"
      />

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* === LEFT SIDEBAR FILTERS === */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-md border h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Filters</h2>
          
          {/* Filter 1: Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Property Type</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Properties</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>

          {/* Filter 2: Max Price */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Max Price (₹)</label>
            <input 
              type="number" 
              placeholder="e.g. 50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter 3: BHK */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Bedrooms (BHK)</label>
            <select 
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="all">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

          {/* Filter 4: Minimum Plot Area */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Min. Area (sq ft)</label>
            <input 
              type="number" 
              placeholder="e.g. 1000"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <button 
            onClick={() => {
              setSearch("");
              setFilterType("all");
              setMaxPrice("");
              setBhk("all");
              setMinArea("");
            }}
            className="w-full text-blue-600 hover:text-blue-800 text-sm font-semibold underline mt-2"
          >
            Clear All Filters
          </button>
        </div>

        {/* === RIGHT SIDE: PROPERTIES GRID === */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border">
                  <img
                    src={`http://localhost:5000/${item.images?.[0]}`}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">📍 {item.location}</p>
                    <p className="text-blue-600 font-bold text-lg mb-4">₹ {item.price.toLocaleString("en-IN")}</p>
                    
                    <button 
                      onClick={() => navigate(`/property/${item._id}`)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border border-dashed">
                <p className="text-gray-500 text-lg">No properties match your current filters.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}