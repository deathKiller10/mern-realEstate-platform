// export default function Footer() {
//   return (
//     <footer
//       style={{
//         marginTop: "30px",
//         padding: "15px",
//         borderTop: "1px solid black",
//         textAlign: "center",
//       }}
//     >
//       <p>
//         © {new Date().getFullYear()} realEstate | All Rights Reserved
//       </p>

//       <p>
//         GitHub:{" "}
//         <a
//           href="https://github.com/deathKiller10/mern-realEstate-platform"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//             realEstate-platform
//         </a>
//       </p>

//       <p>Contact: +91-9876023210</p>
//     </footer>
//   );
// }


import { NavLink } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              NexEstate
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in real estate. Connecting buyers, sellers, and renters through a seamless digital experience.
            </p>
            
            <p className="text-gray-500 text-xs">
              © {currentYear} NexEstate. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/properties"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact & GitHub */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact & Info</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                <span className="block text-xs text-gray-500 mb-0.5">Phone</span>
                <a 
                  href="tel:+919876023210" 
                  className="hover:text-white transition-colors"
                >
                  +91 98760 23210
                </a>
              </li>
              
              <li className="text-gray-400 text-sm">
                <span className="block text-xs text-gray-500 mb-0.5">Email</span>
                <a 
                  href="mailto:support@nexestate.com" 
                  className="hover:text-white transition-colors"
                >
                  support@nexestate.com
                </a>
              </li>
              
              <li className="pt-3">
                <a
                  href="https://github.com/deathKiller10/mern-realEstate-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <span>⭐</span>
                  <span>View on GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <NavLink to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </NavLink>
              <NavLink to="/help" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Help Center
              </NavLink>
            </div>
            
            <p className="text-xs text-gray-500">
              Made with ❤️ in India
            </p>
            <i class="fa-solid fa-angles-up"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
