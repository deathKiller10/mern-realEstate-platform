// // src/pages/MyBookings.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Calendar, 
//   MapPin, 
//   Home, 
//   IndianRupee,
//   ArrowRight,
//   Building2
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const userEmail = user?.email;

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/properties/my-bookings`, {
//           params: { email: userEmail },
//           headers: { Authorization: `Bearer ${token}` } 
//         });
//         console.log("Bookings found:", res.data);
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userEmail) {
//       fetchBookings();
//     } else {
//       setLoading(false);
//     }
//   }, [userEmail]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Building2 className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900">My Booked Properties</h1>
//               <p className="text-gray-600 mt-1">
//                 {bookings.length} {bookings.length === 1 ? 'property' : 'properties'} booked
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-500">Loading your booked properties...</p>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && bookings.length === 0 && (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 md:p-16 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <Home className="w-10 h-10 text-slate-400" />
//               </div>
              
//               <h2 className="text-2xl font-bold text-slate-900 mb-3">No booked properties yet</h2>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 Start exploring our listings and book your dream property today.
//               </p>
              
//               <NavLink 
//                 to="/properties" 
//                 className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
//               >
//                 <span>Browse Properties</span>
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </NavLink>
//             </div>
//           </div>
//         )}

//         {/* Bookings Grid */}
//         {!loading && bookings.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
//               >
//                 {/* Actual Property Image */}
//                 <div className="relative h-44 bg-slate-100 overflow-hidden">
//                   <img 
//                     src={
//                       booking.images?.[0]
//                         ? `http://localhost:5000/${booking.images[0].replace(/\\/g, "/")}` 
//                         : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
//                     } 
//                     alt={booking.title || "Booked Property"} 
//                     className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => { 
//                       e.target.onerror = null;
//                       e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"; 
//                     }} 
//                   />
//                   {/* Subtle dark overlay for contrast */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                  
//                   {/* Booked Badge */}
//                   <div className="absolute bottom-3 left-3 z-10">
//                     <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-green-700 shadow-lg flex items-center gap-1 border border-green-100">
//                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
//                       Booked
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Property Details */}
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
//                     {booking.title}
//                   </h3>
                  
//                   <div className="flex items-center gap-2 text-gray-500 mb-3">
//                     <MapPin className="w-4 h-4 flex-shrink-0" />
//                     <span className="text-sm line-clamp-1">{booking.location}</span>
//                   </div>
                  
//                   {/* Price and Booking Date */}
//                   <div className="flex items-center justify-between py-3 border-t border-gray-100">
//                     <div className="flex items-center gap-1 text-xl font-bold text-green-600">
//                       <IndianRupee className="w-4 h-4" />
//                       <span>{booking.price?.toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-gray-500">
//                       <Calendar className="w-3 h-3" />
//                       <span>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "Recently"}</span>
//                     </div>
//                   </div>
                  
//                   {/* View Details Button */}
//                   <NavLink
//                     to={`/property/${booking.propertyId || booking._id}`}
//                     className="mt-3 w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-all duration-200 text-sm font-medium group/link"
//                   >
//                     <span>View Property Details</span>
//                     <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
//                   </NavLink>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/MyBookings.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Calendar, 
  MapPin, 
  Home, 
  IndianRupee,
  ArrowRight,
  Building2
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/properties/my-bookings`, {
          params: { email: userEmail },
          headers: { Authorization: `Bearer ${token}` } 
        });
        console.log("Bookings found:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userEmail) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">My Booked Properties</h1>
              <p className="text-gray-600 mt-1">
                {bookings.length} {bookings.length === 1 ? 'property' : 'properties'} booked
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your booked properties...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 md:p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-slate-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No booked properties yet</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start exploring our listings and book your dream property today.
              </p>
              
              <NavLink 
                to="/properties" 
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                style={{ color: 'white' }}
              >
                <span className="text-white">Browse Properties</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>
        )}

        {/* Bookings Grid */}
        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Actual Property Image */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img 
                    src={
                      booking.images?.[0]
                        ? `http://localhost:5000/${booking.images[0].replace(/\\/g, "/")}` 
                        : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
                    } 
                    alt={booking.title || "Booked Property"} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { 
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"; 
                    }} 
                  />
                  {/* Subtle dark overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                  
                  {/* Booked Badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-green-700 shadow-lg flex items-center gap-1 border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Booked
                    </span>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                    {booking.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{booking.location}</span>
                  </div>
                  
                  {/* Price and Booking Date */}
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xl font-bold text-green-600">
                      <IndianRupee className="w-4 h-4" />
                      <span>{booking.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "Recently"}</span>
                    </div>
                  </div>
                  
                  {/* View Details Button */}
                  <NavLink
                    to={`/property/${booking.propertyId || booking._id}`}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group/link"
                    style={{ color: 'white' }}
                  >
                    <span className="text-white">View Property Details</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover/link:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}