// import { NavLink } from "react-router-dom";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
//           {/* Brand Section */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               NexEstate
//             </h3>
            
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Your trusted partner in real estate. Connecting buyers, sellers, and renters through a seamless digital experience.
//             </p>
            
//             <p className="text-gray-500 text-xs">
//               © {currentYear} NexEstate. All rights reserved.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <NavLink
//                   to="/"
//                   className="text-gray-400 hover:text-white transition-colors text-sm"
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/properties"
//                   className="text-gray-400 hover:text-white transition-colors text-sm"
//                 >
//                   Properties
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className="text-gray-400 hover:text-white transition-colors text-sm"
//                 >
//                   About Us
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Contact & GitHub */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">Contact & Info</h4>
//             <ul className="space-y-3">
//               <li className="text-gray-400 text-sm">
//                 <span className="block text-xs text-gray-500 mb-0.5">Phone</span>
//                 <a 
//                   href="tel:+919876023210" 
//                   className="hover:text-white transition-colors"
//                 >
//                   +91 98760 23210
//                 </a>
//               </li>
              
//               <li className="text-gray-400 text-sm">
//                 <span className="block text-xs text-gray-500 mb-0.5">Email</span>
//                 <a 
//                   href="mailto:support@nexestate.com" 
//                   className="hover:text-white transition-colors"
//                 >
//                   support@nexestate.com
//                 </a>
//               </li>
              
//               <li className="pt-3">
//                 <a
//                   href="https://github.com/deathKiller10/mern-realEstate-platform"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
//                 >
//                   <span>⭐</span>
//                   <span>View on GitHub</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-6 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-6">
//               <NavLink to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
//                 Privacy Policy
//               </NavLink>
//               <NavLink to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
//                 Terms of Service
//               </NavLink>
//               <NavLink to="/help" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
//                 Help Center
//               </NavLink>
//             </div>
//             <p className="text-xs text-gray-500">
//               Made with ❤️ in India
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { NavLink } from "react-router-dom";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600">
                NexEstate
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Your trusted partner in real estate. Connecting buyers, sellers, and renters through a seamless digital experience.
              </p>
              
              <p className="text-gray-500 text-xs">
                © {currentYear} NexEstate. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/properties"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact & GitHub */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact & Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-gray-500">Phone</span>
                    <a 
                      href="tel:+919876023210" 
                      className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                    >
                      +91 98760 23210
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-gray-500">Email</span>
                    <a 
                      href="mailto:support@nexestate.com" 
                      className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                    >
                      support@nexestate.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-gray-500">Address</span>
                    <span className="text-gray-700 text-sm">
                      123 Real Estate Ave, Mumbai
                    </span>
                  </div>
                </li>
                
                <li className="pt-3">
                  <a
                    href="https://github.com/deathKiller10/mern-realEstate-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-700"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>View on GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <NavLink to="/privacy" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </NavLink>
                <NavLink to="/terms" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Terms of Service
                </NavLink>
                <NavLink to="/help" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Help Center
                </NavLink>
              </div>
              
              <p className="text-xs text-gray-500">
                Made with ❤️ in India
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ animation: "bounce-subtle 2s ease-in-out infinite" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <style>
        {`
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </>
  );
}