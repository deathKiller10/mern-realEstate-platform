import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Mail, 
  ArrowLeft, 
  Send, 
  Key, 
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [focusedField, setFocusedField] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous message
    setMessage({ type: "", text: "" });
    
    // Validate email
    if (!email.trim()) {
      setMessage({ type: "error", text: "Email address is required" });
      return;
    }
    
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ 
          type: "success", 
          text: "Reset link sent! Check your backend terminal for reset password link." 
        });
        setEmail(""); // Clear email field on success
      } else {
        setMessage({ 
          type: "error", 
          text: data.message || "Something went wrong. Please try again." 
        });
      }
    } catch (err) {
      console.log(err);
      setMessage({ 
        type: "error", 
        text: "Server error. Please check your connection and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoEmail = () => {
    setEmail("buyer@nexestate.com");
    setMessage({ type: "info", text: "Demo email filled: buyer@nexestate.com" });
    setTimeout(() => {
      setMessage(prev => prev.type === "info" ? { type: "", text: "" } : prev);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
            <p className="text-blue-200 text-sm">
              No worries — we'll send you a reset link
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {/* Message Display */}
            {message.text && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
                message.type === "success" 
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500" 
                  : message.type === "error"
                  ? "bg-red-50 text-red-700 border-l-4 border-red-500"
                  : "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
              }`}>
                {message.type === "success" && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                {message.type === "error" && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                {message.type === "info" && <Info className="w-4 h-4 flex-shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-6">
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
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (message.text) setMessage({ type: "", text: "" });
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <span>✓</span>
                  <span>Enter your registered email address</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative group bg-gradient-to-r from-slate-800 to-blue-900 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isSubmitting 
                    ? "opacity-75 cursor-not-allowed" 
                    : "hover:from-slate-700 hover:to-blue-800"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Demo Credentials Button
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={fillDemoEmail}
                className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Use Demo Email</span>
              </button>
            </div> */}

            {/* Back to Login Link */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <NavLink 
                to="/buyerlogin" 
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </NavLink>
            </div>

            {/* Security Notice */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Shield className="w-3 h-3" />
              <span>Secure reset • Link expires in 1 hour</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-4">
          <p className="text-xs text-blue-200">
            Don't have an account?{" "}
            <NavLink to="/buyerregister" className="text-white font-semibold hover:underline">
              Create account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;