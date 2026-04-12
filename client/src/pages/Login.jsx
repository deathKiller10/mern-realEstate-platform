import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Shield, 
  Home,
  ArrowRight,
  Key,
  AlertCircle,
  ShieldCheck,
  Database,
  Users,
  Activity
} from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const validatechange = async () => {
    const { email, password } = formdata;

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Verifying admin credentials...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (!data.user || data.user.role !== "admin") {
          toast.error("Access Denied: You are not an Admin!", { id: toastId });
          setIsSubmitting(false);
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        login(data.user, data.token);

        toast.success("Admin Login Successful!", { id: toastId });
        navigate("/admindashboard");
      } 
      else {
        toast.error(data.message || "Invalid credentials", { id: toastId });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.", { id: toastId });
      setIsSubmitting(false);
    }
  };

  // Demo credentials for quick testing
  const fillDemoCredentials = () => {
    setForm({
      email: "admin@nexestate.com",
      password: "admin123"
    });
    toast.success("Demo credentials filled!");
  };

  const adminFeatures = [
    { icon: Users, label: "User Management", color: "from-blue-500 to-blue-600" },
    { icon: Database, label: "Property Oversight", color: "from-purple-500 to-purple-600" },
    { icon: Activity, label: "Platform Analytics", color: "from-green-500 to-emerald-600" }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
          
          {/* Left Side - Admin Portal Info */}
          <div className="hidden lg:block text-white">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-red-500/30">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-red-200">Restricted Access</span>
              </div>
              
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 ml-6 shadow-2xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Admin{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                  Portal
                </span>
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Secure access for platform administrators. Monitor, manage, and maintain the NexEstate ecosystem.
              </p>
            </div>

            {/* Admin Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Administrative Controls
              </h3>
              {adminFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-200">{feature.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-200 font-medium mb-1">Authorized Personnel Only</p>
                  <p className="text-xs text-gray-400">
                    This area is restricted to system administrators. All access attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-red-200">Restricted Access</span>
              </div>
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-gray-300">Secure administrative access</p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
                  <p className="text-sm text-gray-500">Enter your credentials to continue</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-red-400 rounded-xl' : ''
                  }`}>
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'email' ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="admin@nexestate.com"
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
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-red-400 rounded-xl' : ''
                  }`}>
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'password' ? 'text-red-500' : 'text-gray-400'
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

                {/* Login Button */}
                <button
                  onClick={validatechange}
                  disabled={isSubmitting}
                  className={`w-full relative group bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? "opacity-75 cursor-not-allowed" 
                      : "hover:from-red-600 hover:to-red-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        <span>Access Admin Portal</span>
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

              {/* Return to Site */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Not an administrator?{" "}
                  <NavLink 
                    to="/" 
                    className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 group"
                  >
                    <span>Return to site</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <NavLink to="/buyerlogin" className="text-gray-400 hover:text-white transition-colors">
                Buyer Login
              </NavLink>
              <span className="text-gray-500">•</span>
              <NavLink to="/ownerlogin" className="text-gray-400 hover:text-white transition-colors">
                Owner Login
              </NavLink>
              <span className="text-gray-500">•</span>
              <NavLink to="/help" className="text-gray-400 hover:text-white transition-colors">
                Help
              </NavLink>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Shield className="w-3 h-3" />
              <span>End-to-end encrypted • Session monitored</span>
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

export default Login;