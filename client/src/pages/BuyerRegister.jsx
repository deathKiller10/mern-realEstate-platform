import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function BuyerRegister() {
   const [formdata, setForm] = useState({
       name: "",
       mobile: "",
       email: "",
       password: "",
     });
   
     const handlechange = (d) => {
       setForm({
         ...formdata,
         [d.target.name]: d.target.value,
       });
     }; 
    
const navigate = useNavigate();

const message = async () => {
  const { name, mobile, email, password } = formdata;
  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          password,
          role: "buyer"
        })
      }
    );

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registered successfully");
    navigate("/buyerlogin");
  }
  catch {
    alert("Server error");
  }

};
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90">

      <div className="bg-white p-10 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Buyer Register
        </h2>

        <input
          type="text"
          name="name"
          value={formdata.name}
          placeholder="Enter full name"
          className="w-full border p-3 mb-4 rounded" onChange={handlechange}
        /><br></br><br></br>

        <input
          type="text"
          name="mobile"
          value={formdata.mobile}
          placeholder="Mobile No."
          className="w-full border p-3 mb-4 rounded" onChange={handlechange}
        /><br></br><br></br>

        <input
          type="email"
          name="email"
          value={formdata.email}
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded" onChange={handlechange}
        /><br></br><br></br>

        <input
          type="password"
          name="password"
          value={formdata.password}
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded" onChange={handlechange}
        /><br></br><br></br>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded" onClick={message}>
          Register
        </button>

        <p className="text-center mt-4">
          Existing user?{" "}
          <NavLink
            to="/buyerlogin"
            className="text-green-500 font-medium"
          >
            Login
          </NavLink>
        </p>

      </div>
    </div>
  );
}
export default BuyerRegister