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
  Key
} from "lucide-react";
import toast from "react-hot-toast";

function BuyerLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

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

  const fillDemoCredentials = () => {
    setForm({
      email: "buyer@nexestate.com",
      password: "demo123"
    });
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Back to Home */}
      <NavLink 
        to="/" 
        className="absolute top-6 left-6 group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm">Back to Home</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </NavLink>

      {/* Main Container - Two Column Layout like Owner Login */}
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT PANEL - Brand/Feature Section (Same as Owner Login) */}
            <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">NexEstate</h1>
                  <div className="border-l-3 border-amber-400 pl-3 mt-2 text-sm text-blue-200">
                    Your gateway to smarter real estate
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span>Reach thousands of listings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span>Smart property alerts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span>Verified buyer badge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span className="text-sm">Instant match</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span className="text-sm">Market insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span>
                    <span className="text-sm">Virtual tours</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-xs text-blue-200">Active Buyers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5k+</div>
                    <div className="text-xs text-blue-200">Properties Listed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs text-blue-200">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Login Form (Same Style as Owner Login) */}
            <div className="p-8 bg-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to your buyer account</p>
              </div>

              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                  }`}>
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formdata.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <NavLink 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                  }`}>
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formdata.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all [&::-ms-reveal]:hidden"
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
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                    />
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
                        {/* <span>→</span> */}
                        <span>Sign In to Dashboard</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Demo Credentials */}
                <div className="text-center pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                  >
                    {/* <Key className="w-4 h-4" /> */}
                    <span>Use Demo Credentials</span>
                  </button>
                </div>

                {/* Create Account Link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    New to NexEstate?{" "}
                    <NavLink 
                      to="/buyerregister" 
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 group"
                    >
                      <span>Create buyer account</span>
                      {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                    </NavLink>
                  </p>
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-center gap-6 pt-4 text-xs">
                  <NavLink to="/ownerlogin" className="text-gray-500 hover:text-gray-700">
                    Owner Login
                  </NavLink>
                  <span className="text-gray-300">•</span>
                  <NavLink to="/about" className="text-gray-500 hover:text-gray-700">
                    About
                  </NavLink>
                  <span className="text-gray-300">•</span>
                  <NavLink to="/help" className="text-gray-500 hover:text-gray-700">
                    Help
                  </NavLink>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs pt-2">
                  <Shield className="w-3 h-3" />
                  <span>Secure login • Your data is protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerLogin;