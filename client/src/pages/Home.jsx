import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <div className="w-full bg-blue-900 text-white py-20 px-4 text-center rounded-xl shadow-lg mt-2 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-lg md:text-xl mb-8 text-blue-200">
          The premier MERN-based Real Estate Brokering Platform
        </p>
        
        {/* Quick Search */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-2">
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, or title..." 
            className="flex-grow px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400 ring-1 ring-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition">
            Search
          </button>
        </form>
      </div>

      {/* Calls to Action */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        
        <div className="bg-white p-8 rounded-xl shadow border border-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-3 text-blue-900">Looking to Buy or Rent?</h2>
          <p className="text-gray-600 mb-6">Browse our extensive list of verified properties.</p>
          <NavLink to="/properties" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Browse Properties
          </NavLink>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow border border-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-3 text-blue-900">Want to Sell or Lease?</h2>
          <p className="text-gray-600 mb-6">List your property and reach thousands of buyers.</p>
          <NavLink to="/ownerlogin" className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            List a Property
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default Home;