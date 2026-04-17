import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/Authcontext";
import logo from "../assets/NexEstate.png";
import { 
  Search, 
  ChevronDown, 
  LogOut, 
  User, 
  Home, 
  Building2, 
  Heart, 
  BookOpen, 
  Info, 
  PlusCircle,
  LayoutDashboard,
  MessageCircle,
  Shield,
  X,
  Menu,
  Bell
} from "lucide-react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user && (user.role === 'buyer' || user.role === 'owner')) {
      const fetchUnread = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/unread`, {
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
      setIsMobileOpen(false);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/properties", label: "Properties", icon: Building2 },
    ...(user?.role === "owner" ? [{ to: "/ownerdetails", label: "Post Property", icon: PlusCircle }] : []),
    ...(user?.role === "buyer" ? [
      { to: "/my-bookings", label: "My Bookings", icon: BookOpen },
      { to: "/wishlist", label: "Wishlist", icon: Heart }
    ] : []),
    { to: "/about", label: "About", icon: Info }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white shadow-md"
    }`}>
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center group" onClick={() => setIsMobileOpen(false)}>
            {/* Increased height from h-12 to h-16 (mobile) and md:h-14 to md:h-20 (desktop) */}
            <img src={logo} alt="NexEstate" className="h-16 md:h-20 transition-transform group-hover:scale-105" />
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* DESKTOP SEARCH - Only show if user is logged in */}
          {user && (
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </form>
            </div>
          )}

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            {/* Notifications */}
            {user && (user.role === 'buyer' || user.role === 'owner') && (
              <NavLink
                to="/inbox"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Messages"
              >
                <MessageCircle className="w-5 h-5 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            )}

            {/* USER PROFILE / LOGIN */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                    {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold text-gray-900">{displayName}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* DROPDOWN MENU */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{displayName}</p>
                      <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {user.role === "owner" && (
                        <>
                          <NavLink 
                            to="/ownerdashboard" 
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                          </NavLink>
                          <NavLink 
                            to="/ownerdetails" 
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 transition-colors"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Add Property</span>
                          </NavLink>
                        </>
                      )}
                      
                      {(user.role === "buyer" || user.role === "owner") && (
                        <NavLink 
                          to="/inbox" 
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MessageCircle className="w-4 h-4" />
                            <span>Messages</span>
                          </div>
                          {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                              {unreadCount}
                            </span>
                          )}
                        </NavLink>
                      )}

                      {user.role === "admin" && (
                        <NavLink 
                          to="/admindashboard" 
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </NavLink>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* LOGIN DROPDOWN */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <NavLink 
                      to="/buyerlogin" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Buyer Login</span>
                    </NavLink>
                    <NavLink 
                      to="/ownerlogin" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Owner Login</span>
                    </NavLink>
                    <NavLink 
                      to="/login" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-600 font-semibold border-t border-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Portal</span>
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => {
                setIsMobileOpen(!isMobileOpen);
                setShowDropdown(false);
              }}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Search - Only show if user is logged in */}
            {user && (
              <div className="p-4 bg-gray-50 border-b">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="py-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-3.5 text-lg transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile User Info (if logged in) */}
            {user && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{displayName}</p>
                    <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}