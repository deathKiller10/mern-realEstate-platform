// import { useState, useContext } from "react";
// import { AuthContext } from "../context/Authcontext";
// import { NavLink, useNavigate } from "react-router-dom";
// import eyeOpen from "../assets/eye-open.png";
// import eyeClosed from "../assets/eye-closed.png";
// import toast from "react-hot-toast";

// function BuyerLogin() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();  
//   const [formdata, setForm] = useState({ email: "", password: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (d) => {
//     setForm({ ...formdata, [d.target.name]: d.target.value });
//   };

//   const validatechange = async () => {
//     const { email, password } = formdata;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^[A-Za-z0-9]{8,}$/;

//     if (!emailRegex.test(email)) {
//       return toast.error("Please enter a valid email address.");
//     }
//     if (!passwordRegex.test(password)) {
//       return toast.error("Password must be at least 8 characters and contain only letters and numbers.");
//     }

//     setIsSubmitting(true);
//     const toastId = toast.loading("Logging in...");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Check role BEFORE saving to localStorage
//         if (data.user.role !== "buyer") {
//           toast.error("Account mismatch! Please use the Owner login page.", { id: toastId });
//           return;
//         }

//         // Store user & token
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("token", data.token);

//         // Update context
//         login(data.user, data.token);

//         // UI feedback
//         toast.success("Login Successful!", { id: toastId });

//         // redirect
//         navigate("/properties");
//       } else {
//         toast.error(data.message || "Login failed", { id: toastId });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Server error. Please try again.", { id: toastId });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90 px-4">
//       <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Buyer Login</h2>

//         <div className="space-y-4">
//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <div className="relative mb-3">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formdata.password}
//             onChange={handleChange}  
//             placeholder="Password"
//             className="w-full border p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//           <img
//             src={showPassword ? eyeOpen : eyeClosed}
//             alt="toggle password"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 w-6 h-6 cursor-pointer hover:scale-110 transition"
//           />
//         </div>
          
//           <div className="text-right">
//             <NavLink to="/forgot-password" className="text-sm text-blue-500 hover:underline">
//               Forgot Password?
//             </NavLink>
//           </div>

//           <button
//             onClick={validatechange}
//             disabled={isSubmitting}
//             className={`w-full text-white py-3 rounded font-semibold transition ${isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </div>

//         <p className="text-center mt-6 text-sm">
//           Don't have an account?{" "}
//           <NavLink to="/buyerregister" className="text-green-500 font-bold hover:underline">
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
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  LogIn, 
  User,
  Home,
  ArrowRight,
  Shield,
  Key,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

function BuyerLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...formdata, [e.target.name]: e.target.value });
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
        if (data.user.role !== "buyer") {
          toast.error("Account mismatch! Please use the Owner login page.", { id: toastId });
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

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

  // Demo credentials for quick testing
  const fillDemoCredentials = () => {
    setForm({
      email: "buyer@example.com",
      password: "password123"
    });
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Back to Home */}
      <NavLink 
        to="/" 
        className="absolute top-6 left-6 group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm">Back to Home</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </NavLink>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-200">Sign in to your buyer account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <LogIn className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Buyer Login</h2>
          </div>

          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className={`relative transition-all duration-200 ${
                focusedField === 'email' ? 'ring-2 ring-green-400 rounded-xl' : ''
              }`}>
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formdata.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <NavLink 
                  to="/forgot-password" 
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Forgot Password?
                </NavLink>
              </div>
              <div className={`relative transition-all duration-200 ${
                focusedField === 'password' ? 'ring-2 ring-green-400 rounded-xl' : ''
              }`}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-green-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={validatechange}
              disabled={isSubmitting}
              className={`w-full relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                isSubmitting 
                  ? "opacity-75 cursor-not-allowed" 
                  : "hover:from-green-600 hover:to-emerald-700"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {/* Demo Credentials */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <Key className="w-4 h-4" />
              <span>Use Demo Credentials</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              New to NexEstate?{" "}
              <NavLink 
                to="/buyerregister" 
                className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-1 group"
              >
                <span>Create an account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <NavLink to="/ownerlogin" className="text-blue-200 hover:text-white transition-colors">
            Owner Login
          </NavLink>
          <span className="text-blue-300">•</span>
          <NavLink to="/about" className="text-blue-200 hover:text-white transition-colors">
            About
          </NavLink>
          <span className="text-blue-300">•</span>
          <NavLink to="/help" className="text-blue-200 hover:text-white transition-colors">
            Help
          </NavLink>
        </div>

        {/* Security Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-blue-200/60 text-xs">
          <Shield className="w-3 h-3" />
          <span>Secure login protected by encryption</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default BuyerLogin;