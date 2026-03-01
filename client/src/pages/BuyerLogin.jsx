import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";

function BuyerLogin() {
   const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (d) => {
    setForm({
      ...formdata,
      [d.target.name]: d.target.value,
    });
  };

  const validatechange = async () => {
  const { email, password } = formdata;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email");
    return;
  }
  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }


    login(data.user, data.token);
    alert("Login Successful");
    navigate("/");
  }
  catch {
    alert("Server error");
  }

};

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90">

      <div className="bg-white p-10 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Buyer Login
        </h2>

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 "
        /><br></br><br></br>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        /><br></br><br></br>

        <button
          onClick={validatechange}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded"
        >
            Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <NavLink
            to="/buyerregister"
            className="text-green-500 font-medium"
          >
            Create New Account
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default BuyerLogin;