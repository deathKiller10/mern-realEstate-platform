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
  Building2,
  TrendingUp,
  Users,
  BadgeCheck,
  CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";

function OwnerRegister() {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fname + " " + lname,
          mobile,
          email,
          password,
          role: "owner"   
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered Successfully! You can now log in.", { id: toastId });
        navigate("/ownerlogin");  
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
      fname: "Sarah",
      lname: "Smith",
      mobile: "9876543211",
      email: "owner@example.com",
      password: "owner123"
    });
    toast.success("Demo details filled!");
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

          {/* Right Side - Register Form */}
          <div>
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Owner Registration</h1>
              <p className="text-blue-200">Create your property owner account</p>
            </div>

            {/* Register Form Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              </div>

              <div className="space-y-4">
                {/* Name Fields - Two Column */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className={`relative transition-all duration-200 ${
                      focusedField === 'fname' ? 'ring-2 ring-green-400 rounded-xl' : ''
                    }`}>
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'fname' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="fname"
                        placeholder="Sarah"
                        value={formdata.fname}
                        onChange={handlechange}
                        onFocus={() => setFocusedField('fname')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className={`relative transition-all duration-200 ${
                      focusedField === 'lname' ? 'ring-2 ring-green-400 rounded-xl' : ''
                    }`}>
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'lname' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="lname"
                        placeholder="Smith"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'mobile' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'mobile' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="9876543211"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'email' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="owner@example.com"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'password' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
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
                        <span>Create Owner Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                      to="/ownerlogin" 
                      className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-1 group"
                    >
                      <span>Sign in</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <NavLink to="/buyerregister" className="text-blue-200 hover:text-white transition-colors">
                Buyer Register
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
              <span>Secure registration • Your data is protected</span>
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

export default OwnerRegister;