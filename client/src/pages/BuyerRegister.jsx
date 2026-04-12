import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  UserPlus,
  User,
  Home,
  ArrowRight,
  Shield,
  Phone,
  CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";

function BuyerRegister() {
  const navigate = useNavigate();  
  const [formdata, setForm] = useState({ fname: "", lname: "", mobile: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handlechange = (e) => {
    setForm({ ...formdata, [e.target.name]: e.target.value });
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

  const fillDemoDetails = () => {
    setForm({
      fname: "John",
      lname: "Doe",
      mobile: "9876543210",
      email: "buyer@nexestate.com",
      password: "demo123"
    });
    toast.success("Demo details filled!");
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

      {/* Main Container */}
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT PANEL - Brand/Feature Section */}
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
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Save favorite properties</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Get instant property alerts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Schedule property visits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Connect with owners directly</span>
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

            {/* RIGHT PANEL - Register Form */}
            <div className="p-8 bg-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 text-sm mt-1">Join as a buyer to start your journey</p>
              </div>

              <div className="space-y-4">
                {/* Name Fields - Two Column */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className={`relative transition-all duration-200 ${
                      focusedField === 'fname' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                    }`}>
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'fname' ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="fname"
                        placeholder="John"
                        value={formdata.fname}
                        onChange={handlechange}
                        onFocus={() => setFocusedField('fname')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className={`relative transition-all duration-200 ${
                      focusedField === 'lname' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                    }`}>
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'lname' ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="lname"
                        placeholder="Doe"
                        value={formdata.lname}
                        onChange={handlechange}
                        onFocus={() => setFocusedField('lname')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'mobile' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                  }`}>
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'mobile' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="9876543210"
                      value={formdata.mobile}
                      onChange={handlechange}
                      onFocus={() => setFocusedField('mobile')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                  }`}>
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formdata.email}
                      onChange={handlechange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                  }`}>
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Min 8 characters"
                      value={formdata.password}
                      onChange={handlechange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={message}
                  disabled={isSubmitting}
                  className={`w-full relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? "opacity-75 cursor-not-allowed" 
                      : "hover:from-green-600 hover:to-emerald-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Create Account</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Demo Fill Button */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={fillDemoDetails}
                    className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                  >
                    {/* <span>✨</span> */}
                    <span>Fill Demo Details</span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <NavLink 
                      to="/buyerlogin" 
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 group"
                    >
                      <span>Sign in</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                  </p>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs pt-2">
                  <Shield className="w-3 h-3" />
                  <span>Your data is secure and protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerRegister;