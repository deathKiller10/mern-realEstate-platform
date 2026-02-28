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
    const message = () => {
      const { name, mobile, email, password } = formdata;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^[A-Za-z0-9]{8,}$/;

      if (!name || !mobile || !email || !password) {
        alert("Please fill all the details");
        return;
      }

      if (!emailRegex.test(email.trim())) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters and contain only letters and numbers. No special characters allowed."
        );
        return;
      }

      alert("Registered Successfully!");
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