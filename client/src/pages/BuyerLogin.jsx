// import { useState, useContext } from "react";
// import { AuthContext } from "../context/Authcontext";
// import { NavLink, useNavigate } from "react-router-dom";

// function BuyerLogin() {
//    const { login } = useContext(AuthContext);
//   const navigate = useNavigate();  
//   const [formdata, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (d) => {
//     setForm({
//       ...formdata,
//       [d.target.name]: d.target.value,
//     });
//   };

//   const validatechange = async () => {
//   const { email, password } = formdata;

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^[A-Za-z0-9]{8,}$/;

//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   if (!passwordRegex.test(password)) {
//     alert(
//       "Password must be at least 8 characters and contain only letters and numbers."
//     );
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       if (data.user.role !== "buyer") {
//         alert("You are not a buyer!");
//         return;
//       }

//       login(data.user, data.token);

//       alert("Login Successful!");

//       navigate("/properties");
//     } else {
//       alert(data.message || "Login failed");
//     }

//   } catch (error) {
//     console.log(error);
//     alert("Server error");
//   }
// };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90">

//       <div className="bg-white p-10 rounded-lg shadow-lg w-96">

//         <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
//           Buyer Login
//         </h2>

//         <input
//           type="text"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 "
//         /><br></br><br></br>

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         /><br></br>
//         <p className="text-right text-sm mb-3">
//         <NavLink
//           to="/forgot-password"
//           className="text-blue-500 hover:underline"
//         >
//           Forgot Password?
//         </NavLink>
//       </p>
//         <button
//           onClick={validatechange}
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded"
//         >
//             Login
//         </button>

//         <p className="text-center mt-4">
//           Don't have an account?{" "}
//           <NavLink
//             to="/buyerregister"
//             className="text-green-500 font-medium"
//           >
//             Create New Account
//           </NavLink>
//         </p>
       
//       </div>
//     </div>
//   );
// }

// export default BuyerLogin;


import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BuyerLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (d) => {
    setForm({ ...formdata, [d.target.name]: d.target.value });
  };

  const validatechange = async () => {
    const { email, password } = formdata;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z0-9]{8,}$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be at least 8 characters and contain only letters and numbers.");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Logging in...");

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // FIXED BUG: Check role BEFORE saving to localStorage!
        if (data.user.role !== "buyer") {
          toast.error("Account mismatch! Please use the Owner login page.", { id: toastId });
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user, data.token);

        toast.success("Login Successful!", { id: toastId });
        navigate("/properties");
      } else {
        toast.error(data.message || "Login failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Buyer Login</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          
          <div className="text-right">
            <NavLink to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </NavLink>
          </div>

          <button
            onClick={validatechange}
            disabled={isSubmitting}
            className={`w-full text-white py-3 rounded font-semibold transition ${isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <NavLink to="/buyerregister" className="text-green-500 font-bold hover:underline">
            Create New Account
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default BuyerLogin;