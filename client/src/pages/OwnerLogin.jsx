import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  LogIn, 
  Building2,
  Home,
  ArrowRight,
  Shield,
  Key,
  TrendingUp,
  Users,
  BadgeCheck
} from "lucide-react";
import toast from "react-hot-toast";

function OwnerLogin() {
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

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Logging in...");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role !== "owner") {
          toast.error("Account mismatch! Please use the Buyer login page.", { id: toastId });
          return;
        }  

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user, data.token); 
        
        toast.success("Login Successful!", { id: toastId });
        navigate("/ownerdashboard");
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
      email: "owner@example.com",
      password: "owner123"
    });
    toast.success("Demo credentials filled!");
  };

  const ownerBenefits = [
    { icon: TrendingUp, text: "Reach thousands of buyers" },
    { icon: Users, text: "Manage multiple properties" },
    { icon: BadgeCheck, text: "Verified owner badge" }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
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

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:block text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                List Your Property,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  Grow Your Business
                </span>
              </h1>
              <p className="text-lg text-blue-200 leading-relaxed">
                Join thousands of property owners who trust NexEstate to manage and grow their real estate portfolio.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {ownerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">10k+</div>
                <div className="text-sm text-blue-200">Active Buyers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">5k+</div>
                <div className="text-sm text-blue-200">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Owner Login</h1>
              <p className="text-blue-200">Access your property dashboard</p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LogIn className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
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
                      placeholder="owner@example.com"
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
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all [&::-ms-reveal]:hidden"
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
                        <span>Sign In to Dashboard</span>
                        {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
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
                  {/* <Key className="w-4 h-4" /> */}
                  <span>Use Demo Credentials</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  New property owner?{" "}
                  <NavLink 
                    to="/ownerregister" 
                    className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-1 group"
                  >
                    <span>Create owner account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <NavLink to="/buyerlogin" className="text-blue-200 hover:text-white transition-colors">
                Buyer Login
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
              <span>Secure login • Your data is protected</span>
            </div>
          </div>
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

export default OwnerLogin;