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
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-14" />
        </NavLink>

        {/* NAVIGATION */}
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-base font medium">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/buyerlogin" className="hover:text-blue-600">Properties</NavLink>
          <NavLink to="/ownerlogin" className="hover:text-blue-600">Post Property</NavLink>
          <NavLink to="/about" className="hover:text-blue-600">About</NavLink>
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
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32">
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

        </div>
      </div>
    </header>
  );
}