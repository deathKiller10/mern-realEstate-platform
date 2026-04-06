import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import logo from "../assets/NexEstate.png";
import MyBookings from "../pages/MyBookings";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  let displayName = "";
  if (user) {
    if (typeof user === "string") {
      displayName = user;
    } else {
      displayName =
        user.name ||
        (user.email
          ? user.email.split("@")[0].replace(/[0-9]/g, "")
          : "User");
    }
  }

  // 1. SEPARATED STATES
  const [showDropdown, setShowDropdown] = useState(false); // For User/Login Menu
  const [isMobileOpen, setIsMobileOpen] = useState(false); // For Hamburger Menu
  
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (user.role === 'buyer' || user.role === 'owner')) {
      const fetchUnread = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:5000/api/messages/unread", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          setUnreadCount(data.unreadCount || 0);
        } catch (err) { console.log(err); }
      };

      fetchUnread();
      const interval = setInterval(fetchUnread, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
      setIsMobileOpen(false); // Close menu on search
    }
  };

  return (
    // Make header relative and high z-index so dropdowns overlap content below
    <header className="bg-white shadow-md relative z-50">
      <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
          <img src={logo} alt="logo" className="h-14" />
        </NavLink>

        {/* NAVIGATION (Desktop Only) */}
        <div className="hidden md:flex items-center gap-5 text-base font-semibold text-gray-700">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">Home</NavLink>
          <NavLink to="/properties" className="hover:text-blue-600 transition-colors">Properties</NavLink>
          <NavLink to="/ownerdetails" className="hover:text-blue-600 transition-colors">Post Property</NavLink>
          <NavLink to="/my-bookings" onClick={() => setShowDropdown(false)} className="block px-4 py-3 hover:bg-blue-50">
            My Bookings
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-600 transition-colors">About</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-full overflow-hidden ml-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-1.5 outline-none w-32 focus:w-48 transition-all duration-300 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm font-medium transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* RIGHT SIDE (User Controls & Hamburger) */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setIsMobileOpen(false); // Close mobile nav if open
                }}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1 rounded-full border"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase shadow-sm">
                  {displayName ? displayName.charAt(0) : "U"}
                </div>
                <span className="hidden sm:block font-medium text-gray-700">{displayName}</span>
              </button>

              {/* USER PROFILE DROPDOWN */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 bg-white border rounded-lg shadow-xl w-52 overflow-hidden z-50">
                  {user.role === "owner" && (
                    <>
                      <NavLink to="/ownerdashboard" onClick={() => setShowDropdown(false)} className="block px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium">
                        My Dashboard
                      </NavLink>
                      <NavLink to="/ownerdetails" onClick={() => setShowDropdown(false)} className="block px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium border-b">
                        Add Property
                      </NavLink>
                    </>
                  )}
                  
                  {(user.role === "buyer" || user.role === "owner") && (
                    <NavLink to="/inbox" onClick={() => setShowDropdown(false)} className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 text-blue-700 font-bold border-b">
                      <span>Inbox</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                          {unreadCount} New
                        </span>
                      )}
                    </NavLink>
                  )}

                  {user.role === "admin" && (
                    <NavLink to="/admindashboard" onClick={() => setShowDropdown(false)} className="block px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium border-b">
                      Admin Dashboard
                    </NavLink>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-bold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setIsMobileOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm"
              >
                Login ▾
              </button>

              {/* LOGIN DROPDOWN */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 bg-white border rounded-lg shadow-xl w-36 overflow-hidden z-50">
                  <NavLink to="/buyerlogin" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium" onClick={() => setShowDropdown(false)}>
                    Buyer
                  </NavLink>
                  <NavLink to="/ownerlogin" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium" onClick={() => setShowDropdown(false)}>
                    Owner
                  </NavLink>
                  <NavLink to="/login" className="block px-4 py-3 hover:bg-blue-50 text-blue-700 font-bold border-t" onClick={() => setShowDropdown(false)}>
                    Admin
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* 2. THE HAMBURGER BUTTON */}
          <button
            onClick={() => {
              setIsMobileOpen(!isMobileOpen);
              setShowDropdown(false); // Close user menu if open
            }}
            className="md:hidden text-3xl ml-2 text-gray-700 focus:outline-none"
          >
            {isMobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU SLIDE-DOWN */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg flex flex-col z-40">
          <NavLink to="/" onClick={() => setIsMobileOpen(false)} className="px-6 py-4 border-b text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600">Home</NavLink>
          <NavLink to="/properties" onClick={() => setIsMobileOpen(false)} className="px-6 py-4 border-b text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600">Properties</NavLink>
          <NavLink to="/ownerdetails" onClick={() => setIsMobileOpen(false)} className="px-6 py-4 border-b text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600">Post Property</NavLink>
          <NavLink to="/about" onClick={() => setIsMobileOpen(false)} className="px-6 py-4 border-b text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600">About</NavLink>
          <NavLink to="/my-bookings" onClick={() => setShowDropdown(false)} className="block px-4 py-3 hover:bg-blue-50">
            My Bookings
          </NavLink>
          <form onSubmit={handleSearch} className="flex px-6 py-4 bg-gray-50">
            <input
              className="border border-gray-300 px-4 py-2 w-full rounded-l-lg outline-none focus:border-blue-500"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg font-bold">Go</button>
          </form>
        </div>
      )}
    </header>
  );
}