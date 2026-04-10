import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import eyeOpen from "../assets/eye-open.png";
import eyeClosed from "../assets/eye-closed.png";
import toast from "react-hot-toast";

function BuyerRegister() {
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({ fname: "", lname: "", mobile: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlechange = (d) => {
    setForm({ ...formdata, [d.target.name]: d.target.value });
  }; 

  const message = async () => {
    const { fname, lname, mobile, email, password } = formdata;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z0-9]{8,}$/;

    if (!fname || !lname || !mobile || !email || !password) {
      return toast.error("Please fill all the details");
    }
    if (!emailRegex.test(email.trim())) {
      return toast.error("Please enter a valid email address.");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be at least 8 characters and contain only letters and numbers.");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fname + " " + lname,
          mobile,
          email,
          password,
          role: "buyer"   
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered Successfully! You can now log in.", { id: toastId });
        navigate("/buyerlogin");
      } else {
        toast.error(data.message || "Registration failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90 py-10 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Buyer Register</h2>

        <div className="space-y-4">
          <input type="text" name="fname" value={formdata.fname} placeholder="First name" className="w-full border p-3 rounded" onChange={handlechange} />
          <input type="text" name="lname" value={formdata.lname} placeholder="Last name" className="w-full border p-3 rounded" onChange={handlechange} />
          <input type="text" name="mobile" value={formdata.mobile} placeholder="Mobile No." className="w-full border p-3 rounded" onChange={handlechange} />
          <input type="email" name="email" value={formdata.email} placeholder="Email" className="w-full border p-3 rounded" onChange={handlechange} />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formdata.password}
              placeholder="Password"
              className="w-full border p-3 pr-12 rounded"
              onChange={handlechange}
            />

            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="toggle password"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 w-6 h-6 cursor-pointer hover:scale-110 transition"
            />
          </div>

          <button 
            disabled={isSubmitting} 
            className={`w-full text-white py-3 rounded font-semibold transition ${isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`} 
            onClick={message}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm">
          Existing user?{" "}
          <NavLink to="/buyerlogin" className="text-green-500 font-bold hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default BuyerRegister;