// import { NavLink ,useNavigate} from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/Authcontext";
// import logo from "../assets/NexEstate.png";

// export default function Header() {
//   const { user, logout } = useContext(AuthContext);
// const displayName = user? user.split("@")[0].replace(/[0-9]/g, ""): "";
//   //const displayName = user?.name || "";
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim() !== "") {
//       navigate(`/search?query=${searchTerm}`);
//     }
//   };
//   return (
//   <header className="bg-white shadow-md px-4 sm:px-6 lg:px-8 py-3 relative">

//     <div className="flex items-center justify-between">

//       {/* LEFT: Logo */}
//       <NavLink to="/" className="flex items-center gap-2">
//         <img src={logo} alt="logo" className="h-20 w-30" />
//       </NavLink>

//       {/* DESKTOP NAV */}
//       <div className="hidden md:flex items-center gap-6">

//         <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
//         <NavLink to="/about" className="hover:text-blue-600">About</NavLink>

//         {/* Expandable Search */}
//         <form
//           onSubmit={handleSearch}
//           className="flex items-center border rounded-full overflow-hidden"
//         >
//           <input
//             type="text"
//             placeholder="Search here..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-3 py-1 outline-none w-32 focus:w-48 transition-all duration-300"
//           />
//           <button className="bg-blue-600 text-white px-3 py-1">
//             Search
//           </button>
//         </form>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-3">

//         {/*  USER / LOGIN */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
//             >
//               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
//                 {displayName.charAt(0).toUpperCase()}
//               </div>
//               <span className="hidden sm:block">{displayName}</span>
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40">
//                 <button
//                   onClick={logout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="bg-blue-600 text-white px-3 py-1 rounded"
//             >
//               Login ▾
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 bg-white border rounded shadow-md flex flex-col w-32">
//                 <NavLink
//                   to="/buyerlogin"
//                   className="px-3 py-2 hover:bg-gray-100"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Buyer
//                 </NavLink>
//                 <NavLink
//                   to="/ownerlogin"
//                   className="px-3 py-2 hover:bg-gray-100"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Owner
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         )}

//         {/* MENU BUTTON */}
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="md:hidden text-xl"
//         >
//           ☰
//         </button>
//       </div>
//     </div>

//     {/* MENU */}
//     {showDropdown && !user && (
//       <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">
//         <NavLink to="/" onClick={() => setShowDropdown(false)}>Home</NavLink>
//         <NavLink to="/about" onClick={() => setShowDropdown(false)}>About</NavLink>

//         <form onSubmit={handleSearch} className="flex">
//           <input
//             className="border px-2 py-1 w-full"
//             placeholder="Search here..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </form>
//       </div>
//     )}
//   </header>
// );
// }


// client/src/components/Header.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import logo from "../assets/NexEstate.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  
  // FIX: Safely check if user is an object, then grab the name. 
  // If it's the admin string, just use the string.
  let displayName = "";
  if (user) {
    if (typeof user === "string") {
      displayName = user; // Handles your Admin Login bypass
    } else {
      displayName = user.name || (user.email ? user.email.split("@")[0].replace(/[0-9]/g, "") : "User");
    }
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
  <header className="bg-white shadow-md px-4 sm:px-6 lg:px-8 py-3 relative">
    <div className="flex items-center justify-between">
      {/* LEFT: Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-20 w-30" />
      </NavLink>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
        <NavLink to="/about" className="hover:text-blue-600">About</NavLink>

        {/* Expandable Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border rounded-full overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 outline-none w-32 focus:w-48 transition-all duration-300"
          />
          <button className="bg-blue-600 text-white px-3 py-1">
            Search
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* USER / LOGIN */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center uppercase">
                {/* FIX: Ensure we only grab the first char if displayName exists */}
                {displayName ? displayName.charAt(0) : "U"}
              </div>
              <span className="hidden sm:block">{displayName}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-48 z-50 overflow-hidden">
                
                {/* Show Dashboard links if the user is an owner */}
                {user.role === "owner" && (
                  <>
                    <NavLink
                      to="/ownerdashboard"
                      onClick={() => setShowDropdown(false)}
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 border-b font-medium text-gray-700"
                    >
                      My Dashboard
                    </NavLink>
                    <NavLink
                      to="/ownerdetails"
                      onClick={() => setShowDropdown(false)}
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 border-b font-medium text-gray-700"
                    >
                      Add Property
                    </NavLink>
                  </>
                )}

                {/* Show Admin Dashboard if user is admin */}
                {user.role === "admin" && (
                  <NavLink
                    to="/admindashboard"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full text-left px-4 py-3 hover:bg-blue-50 border-b font-medium text-gray-700"
                  >
                    Admin Dashboard
                  </NavLink>
                )}

                {/* The Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium transition"
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
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Login ▾
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md flex flex-col w-32 z-50">
                <NavLink
                  to="/buyerlogin"
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Buyer
                </NavLink>
                <NavLink
                  to="/ownerlogin"
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Owner
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-3 py-2 hover:bg-gray-100 text-blue-600 font-semibold"
                  onClick={() => setShowDropdown(false)}
                >
                  Admin
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* MENU BUTTON */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>
    </div>

    {/* MENU */}
    {showDropdown && !user && (
      <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">
        <NavLink to="/" onClick={() => setShowDropdown(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setShowDropdown(false)}>About</NavLink>

        <form onSubmit={handleSearch} className="flex">
          <input
            className="border px-2 py-1 w-full"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    )}
  </header>
  );
}