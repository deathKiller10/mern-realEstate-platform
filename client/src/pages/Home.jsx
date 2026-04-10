import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Search, Home as HomeIcon, Building2, ArrowRight } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Trusted by 10,000+ property seekers</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Property
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            The premier MERN-based real estate platform connecting buyers, sellers, and renters seamlessly
          </p>
          
          {/* Quick Search */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by city, neighborhood, or property title..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Search Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-gray-300">5,000+ Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-green-300" />
              </div>
              <span className="text-gray-300">200+ Cities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for your next home or ready to list your property, we've got you covered
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buy/Rent Card */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <HomeIcon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Looking to Buy or Rent?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse our extensive collection of verified properties with detailed insights and virtual tours.
              </p>
              
              <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
                <span>✓ Verified listings</span>
                <span>✓ Virtual tours</span>
                <span>✓ Instant alerts</span>
              </div>
              
              <NavLink 
                to="/properties" 
                className="group inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>
          
          {/* Sell/Lease Card */}
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Want to Sell or Lease?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                List your property and connect with thousands of qualified buyers and tenants instantly.
              </p>
              
              <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
                <span>✓ Easy listing</span>
                <span>✓ Maximum exposure</span>
                <span>✓ Analytics dashboard</span>
              </div>
              
              <NavLink 
                to="/ownerlogin" 
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <span>List a Property</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}