// import { useParams } from "react-router-dom";
// import { useState } from "react";

// function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch(
//       `http://localhost:5000/api/auth/reset-password/${token}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       }
//     );

//     const data = await res.json();

//     if (res.ok) {
//       alert("Password reset successful");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded">
//         <h2>Reset Password</h2>

//         <input
//           type="password"
//           placeholder="New Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 mb-3"
//         />

//         <button className="bg-green-500 text-white px-4 py-2">
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;
import { useParams } from "react-router-dom";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft
} from "lucide-react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [focusedField, setFocusedField] = useState(null);

  // Password strength checker
  const getPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (pwd.length === 0) return { level: 0, text: "", color: "" };
    if (strength <= 1) return { level: 1, text: "Weak", color: "bg-red-500" };
    if (strength === 2) return { level: 2, text: "Fair", color: "bg-yellow-500" };
    if (strength === 3) return { level: 3, text: "Good", color: "bg-blue-500" };
    return { level: 4, text: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword;
  const isPasswordValid = password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous message
    setMessage({ type: "", text: "" });
    
    // Validate passwords
    if (!password) {
      setMessage({ type: "error", text: "Please enter a new password" });
      return;
    }
    
    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters" });
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage({ 
          type: "success", 
          text: "Password reset successful! Redirecting to login..." 
        });
        setTimeout(() => {
          navigate("/buyerlogin");
        }, 2000);
      } else {
        setMessage({ 
          type: "error", 
          text: data.message || "Failed to reset password. Link may be expired." 
        });
      }
    } catch (err) {
      console.log(err);
      setMessage({ 
        type: "error", 
        text: "Server error. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-blue-200 text-sm">
              Create a new secure password for your account
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {/* Message Display */}
            {message.text && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
                message.type === "success" 
                  ? "bg-green-50 text-green-700 border-l-4 border-green-500" 
                  : "bg-red-50 text-red-700 border-l-4 border-red-500"
              }`}>
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* New Password Field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'password' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                }`}>
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (message.text) setMessage({ type: "", text: "" });
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
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
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${(passwordStrength.level / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.text}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Use 8+ characters with letters, numbers & symbols
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'confirm' ? 'ring-2 ring-blue-400 rounded-xl' : ''
                }`}>
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'confirm' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (message.text) setMessage({ type: "", text: "" });
                    }}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <div className="mt-1">
                    <p className={`text-xs flex items-center gap-1 ${
                      passwordsMatch ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {passwordsMatch ? (
                        <><CheckCircle className="w-3 h-3" /> Passwords match</>
                      ) : (
                        <><AlertCircle className="w-3 h-3" /> Passwords do not match</>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || (password.length > 0 && !passwordsMatch)}
                className={`w-full relative group bg-gradient-to-r from-slate-800 to-blue-900 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isSubmitting || (password.length > 0 && !passwordsMatch)
                    ? "opacity-75 cursor-not-allowed" 
                    : "hover:from-slate-700 hover:to-blue-800"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting password...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Reset Password</span>
                    </>
                  )}
                </span>
              </button>
            </form>

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
              <span>Secure password reset • Link expires in 1 hour</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-4">
          <p className="text-xs text-blue-200">
            Remember your password?{" "}
            <NavLink to="/buyerlogin" className="text-white font-semibold hover:underline">
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;