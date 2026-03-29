import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import logo from "../assets/NexEstate.png";

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

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // RESTORED
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

      fetchUnread(); // Check immediately on load
      const interval = setInterval(fetchUnread, 10000); // Check every 10 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  // RESTORED
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 relative">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-14" />
        </NavLink>

        {/* NAVIGATION (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4 text-base font-medium">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          {/* FIXED: Pointing to /properties instead of /buyerlogin */}
          <NavLink to="/properties" className="hover:text-blue-600">Properties</NavLink>
          {/* FIXED: Pointing to /ownerdetails so the protected route handles the logic */}
          <NavLink to="/ownerdetails" className="hover:text-blue-600">Post Property</NavLink>
          <NavLink to="/about" className="hover:text-blue-600">About</NavLink>
          
          {/* RESTORED SEARCH */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-full overflow-hidden ml-4"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 outline-none w-32 focus:w-48 transition-all duration-300"
            />
            <button className="bg-blue-600 text-white px-3 py-1 text-sm">
              Search
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center uppercase">
                  {displayName ? displayName.charAt(0) : "U"}
                </div>
                <span className="hidden sm:block">{displayName}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-48 z-50">
                  {user.role === "owner" && (
                    <>
                      <NavLink
                        to="/ownerdashboard"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Dashboard
                      </NavLink>
                      <NavLink
                        to="/ownerdetails"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Add Property
                      </NavLink>
                    </>
                  )}
                  {/* Add Inbox for both Buyers and Owners */}
                  {(user.role === "buyer" || user.role === "owner") && (
                    <NavLink to="/inbox" onClick={() => setShowDropdown(false)} className="block px-4 py-2 hover:bg-gray-100 font-semibold text-blue-600 border-b">
                      <span>Inbox</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {user.role === "admin" && (
                    <NavLink
                      to="/admindashboard"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login ▾
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-50">
                  <NavLink
                    to="/buyerlogin"
                    className="block px-3 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Buyer
                  </NavLink>
                  <NavLink
                    to="/ownerlogin"
                    className="block px-3 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Owner
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 hover:bg-gray-100 text-blue-600"
                    onClick={() => setShowDropdown(false)}
                  >
                    Admin
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* RESTORED MOBILE MENU BUTTON */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="md:hidden text-2xl ml-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* RESTORED MOBILE MENU DROPDOWN */}
      {showDropdown && !user && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">
          <NavLink to="/" onClick={() => setShowDropdown(false)}>Home</NavLink>
          <NavLink to="/properties" onClick={() => setShowDropdown(false)}>Properties</NavLink>
          <NavLink to="/ownerdetails" onClick={() => setShowDropdown(false)}>Post Property</NavLink>
          <NavLink to="/about" onClick={() => setShowDropdown(false)}>About</NavLink>

          <form onSubmit={handleSearch} className="flex mt-2">
            <input
              className="border px-2 py-1 w-full rounded-l"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded-r">Go</button>
          </form>
        </div>
      )}
    </header>
  );
}