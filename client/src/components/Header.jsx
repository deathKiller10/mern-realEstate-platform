import { NavLink ,useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import logo from "../assets/NexEstate.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  // const displayName = user? user.split("@")[0].replace(/[0-9]/g, ""): "";
  const displayName = user?.name || "";
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
  <header
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      borderBottom: "1px solid black",
      position: "relative",
    }}
  >

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
    <NavLink
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
      }}
    >
      <img
        src={logo}
        alt="NexEstate Logo"
        style={{
          height: "100px",
          width: "100px",
          objectFit: "contain",
          cursor: "pointer"
        }}
      />
    </NavLink>
      <NavLink to="/" style={{ textDecoration: "none" }}>Home</NavLink>

      <NavLink to="/about">About</NavLink>

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid gray",
          borderRadius: "6px",
          padding: "4px 8px",
        }}
      >
      <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: "none",
            outline: "none",
          }}
      />
        <button
          type="submit"
          style={{
            marginLeft: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>

    <div style={{ position: "relative" }}>
      {user ? (
        <>
          <span style={{ marginRight: "10px" }}>
            Welcome, {displayName}
          </span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            Login ▾
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "35px",
                right: "0",
                backgroundColor: "white",
                border: "1px solid black",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <NavLink
                to="/buyerlogin"
                style={{ marginBottom: "5px" }}
                onClick={() => setShowDropdown(false)}
              >
                Buyer
              </NavLink>

              <NavLink
                to="/ownerlogin"
                onClick={() => setShowDropdown(false)}
              >
                Owner
              </NavLink>
            </div>
          )}
        </>
      )}
    </div>
  </header>
  );
}