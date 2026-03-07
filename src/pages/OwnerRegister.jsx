import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function BuyerRegister() {
  const navigate = useNavigate();  
   const [formdata, setForm] = useState({
       fname: "",
       lname: "",
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
      const { fname, lname, mobile, email, password } = formdata;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^[A-Za-z0-9]{8,}$/;

      if (!fname || !lname || !mobile || !email || !password) {
        alert("Please fill all the details");
        return;
      }

      if (!emailRegex.test(email.trim())) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters and contain only letters and numbers."
        );
        return;
      }

      const userData = {
        fname,
        lname,
        mobile,
        email,
        password
      };

      localStorage.setItem("owner", JSON.stringify(userData));

      alert("Registered Successfully!");
      navigate("/ownerdetails")
    };
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90">

      <div className="bg-white p-10 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Property Owner Register
        </h2>

         <input
          type="text"
          name="fname"
          value={formdata.fname}
          placeholder="First name"
          className="w-full border p-3 mb-4 rounded" onChange={handlechange}
        /><br></br><br></br>

        <input
          type="text"
          name="lname"
          value={formdata.lname}
          placeholder="Last name"
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
            to="/ownerlogin"
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