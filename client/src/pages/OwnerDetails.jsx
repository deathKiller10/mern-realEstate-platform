// import { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import toast from "react-hot-toast";
// import { 
//   Home, 
//   MapPin, 
//   IndianRupee, 
//   FileText, 
//   Tag, 
//   Upload,
//   ArrowLeft,
//   Building2,
//   Bed,
//   Square,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";

// export default function AddProperty() {
//   const navigate = useNavigate(); 
//   const [formData, setFormData] = useState({
//     propertyName: "",
//     address: "",
//     price: "",
//     description: "",
//     type: "",
//     status: "",
//     bhk: "",  
//     area: ""  
//   });

//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(file);
    
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPhotoPreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     if (!photo) {
//       toast.error("Please select an image to upload");
//       return;
//     }

//     setIsSubmitting(true);
//     const toastId = toast.loading('Uploading property and image...');

//     const submitData = new FormData();
//     submitData.append("title", formData.propertyName);
//     submitData.append("description", formData.description);
//     submitData.append("price", formData.price);
//     submitData.append("location", formData.address);
//     submitData.append("type", formData.type);
//     submitData.append("status", formData.status);
//     submitData.append("bhk", formData.bhk); 
//     submitData.append("area", formData.area); 
//     submitData.append("image", photo);

//     try {
//       const res = await fetch("http://localhost:5000/api/properties", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`   
//         },
//         body: submitData, 
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Property Added Successfully!", { id: toastId });
//         navigate("/ownerdashboard");
//       } else {
//         toast.error(data.message || "Failed to add property", { id: toastId });
//       }

//     } catch (error) {
//       console.error(error);
//       toast.error("Server error. Please try again later.", { id: toastId });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fillDemoData = () => {
//     setFormData({
//       propertyName: "Luxury Villa with Garden View",
//       address: "123 Palm Avenue, Beverly Hills, CA",
//       price: "7500000",
//       description: "Beautiful 3 BHK villa with modern amenities, swimming pool, and landscaped garden. Close to schools and shopping centers.",
//       type: "sale",
//       status: "available",
//       bhk: "3",
//       area: "2400"
//     });
//     toast.success("Demo data filled!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Back Button */}
//         <NavLink 
//           to="/ownerdashboard" 
//           className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           <span>Back to Dashboard</span>
//         </NavLink>

//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Building2 className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900">List a New Property</h1>
//               <p className="text-gray-600 mt-1">Fill in the details below to add your property listing</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
//           {/* Form Header with Demo Button */}
//           <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="text-sm text-gray-700 font-medium">All fields are required</span>
//             </div>
//             <button
//               type="button"
//               onClick={fillDemoData}
//               className="text-sm px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-blue-600 font-medium border border-gray-200 hover:border-blue-300"
//             >
//               ✨ Fill Demo Data
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             <div className="space-y-6">
              
//               {/* Property Title */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Property Title
//                 </label>
//                 <div className={`relative transition-all duration-200 ${
//                   focusedField === 'propertyName' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                 }`}>
//                   <Home className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                     focusedField === 'propertyName' ? 'text-green-500' : 'text-gray-400'
//                   }`} />
//                   <input
//                     type="text"
//                     name="propertyName"
//                     placeholder="e.g. Luxury Villa in Downtown"
//                     value={formData.propertyName}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('propertyName')}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Location / Address
//                 </label>
//                 <div className={`relative transition-all duration-200 ${
//                   focusedField === 'address' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                 }`}>
//                   <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                     focusedField === 'address' ? 'text-green-500' : 'text-gray-400'
//                   }`} />
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="e.g. 123 Main St, Springfield"
//                     value={formData.address}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('address')}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Price & Type Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Price (₹)
//                   </label>
//                   <div className={`relative transition-all duration-200 ${
//                     focusedField === 'price' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                   }`}>
//                     <IndianRupee className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                       focusedField === 'price' ? 'text-green-500' : 'text-gray-400'
//                     }`} />
//                     <input
//                       type="number"
//                       name="price"
//                       placeholder="e.g. 5000000"
//                       value={formData.price}
//                       onChange={handleChange}
//                       onFocus={() => setFocusedField('price')}
//                       onBlur={() => setFocusedField(null)}
//                       required
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Listing Type
//                   </label>
//                   <div className={`relative transition-all duration-200 ${
//                     focusedField === 'type' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                   }`}>
//                     <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                       focusedField === 'type' ? 'text-green-500' : 'text-gray-400'
//                     }`} />
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleChange}
//                       onFocus={() => setFocusedField('type')}
//                       onBlur={() => setFocusedField(null)}
//                       required
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
//                     >
//                       <option value="" disabled>Select Type</option>
//                       <option value="rent">For Rent</option>
//                       <option value="sale">For Sale</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* BHK & Area Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Bedrooms (BHK)
//                   </label>
//                   <div className={`relative transition-all duration-200 ${
//                     focusedField === 'bhk' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                   }`}>
//                     <Bed className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                       focusedField === 'bhk' ? 'text-green-500' : 'text-gray-400'
//                     }`} />
//                     <input 
//                       type="number" 
//                       name="bhk" 
//                       value={formData.bhk}
//                       onChange={handleChange}
//                       onFocus={() => setFocusedField('bhk')}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="e.g. 3" 
//                       required 
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Area (sq ft)
//                   </label>
//                   <div className={`relative transition-all duration-200 ${
//                     focusedField === 'area' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                   }`}>
//                     <Square className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                       focusedField === 'area' ? 'text-green-500' : 'text-gray-400'
//                     }`} />
//                     <input 
//                       type="number" 
//                       name="area" 
//                       value={formData.area}
//                       onChange={handleChange}
//                       onFocus={() => setFocusedField('area')}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="e.g. 1200" 
//                       required 
//                       className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Property Description
//                 </label>
//                 <div className={`relative transition-all duration-200 ${
//                   focusedField === 'description' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                 }`}>
//                   <FileText className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
//                     focusedField === 'description' ? 'text-green-500' : 'text-gray-400'
//                   }`} />
//                   <textarea
//                     name="description"
//                     rows="4"
//                     placeholder="Describe the key features of your property..."
//                     value={formData.description}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('description')}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all resize-none"
//                   />
//                 </div>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Current Status
//                 </label>
//                 <div className={`relative transition-all duration-200 ${
//                   focusedField === 'status' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                 }`}>
//                   <AlertCircle className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
//                     focusedField === 'status' ? 'text-green-500' : 'text-gray-400'
//                   }`} />
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('status')}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
//                   >
//                     <option value="" disabled>Select Status</option>
//                     <option value="available">Available</option>
//                     <option value="sold">Sold</option>
//                     <option value="rented">Rented</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Property Image
//                 </label>
//                 <div className={`relative transition-all duration-200 ${
//                   focusedField === 'photo' ? 'ring-2 ring-green-400 rounded-xl' : ''
//                 }`}>
//                   <Upload className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
//                     focusedField === 'photo' ? 'text-green-500' : 'text-gray-400'
//                   }`} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name="filetoupload"
//                     onChange={handleFileChange}
//                     onFocus={() => setFocusedField('photo')}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
//                   />
//                 </div>
                
//                 {/* Image Preview */}
//                 {photoPreview && (
//                   <div className="mt-4">
//                     <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
//                     <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-200">
//                       <img 
//                         src={photoPreview} 
//                         alt="Preview" 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
//                   isSubmitting 
//                     ? "opacity-75 cursor-not-allowed" 
//                     : "hover:from-green-600 hover:to-emerald-700"
//                 }`}
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span>Uploading Property...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-5 h-5" />
//                       <span>List Property</span>
//                     </>
//                   )}
//                 </span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Home, 
  MapPin, 
  IndianRupee, 
  FileText, 
  Tag, 
  Upload,
  ArrowLeft,
  Building2,
  Bed,
  Square,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AddProperty() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    price: "",
    description: "",
    type: "",
    status: "",
    bhk: "",  
    area: ""  
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // 🛡️ FRONTEND VALIDATION: Check if file size exceeds 5MB (5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image is too large! Please select a file under 5MB.");
        e.target.value = null; // Clear the selected file from the input
        setPhoto(null);
        setPhotoPreview(null);
        return;
      }

      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!photo) {
      toast.error("Please select an image to upload");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Uploading property and image...');

    const submitData = new FormData();
    submitData.append("title", formData.propertyName);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);
    submitData.append("location", formData.address);
    submitData.append("type", formData.type);
    submitData.append("status", formData.status);
    submitData.append("bhk", formData.bhk); 
    submitData.append("area", formData.area); 
    submitData.append("image", photo);

    try {
      const res = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`   
        },
        body: submitData, 
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Property Added Successfully!", { id: toastId });
        navigate("/ownerdashboard");
      } else {
        toast.error(data.message || "Failed to add property", { id: toastId });
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoData = () => {
    setFormData({
      propertyName: "Luxury Villa with Garden View",
      address: "123 Palm Avenue, Beverly Hills, CA",
      price: "7500000",
      description: "Beautiful 3 BHK villa with modern amenities, swimming pool, and landscaped garden. Close to schools and shopping centers.",
      type: "sale",
      status: "available",
      bhk: "3",
      area: "2400"
    });
    toast.success("Demo data filled!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <NavLink 
          to="/ownerdashboard" 
          className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </NavLink>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">List a New Property</h1>
              <p className="text-gray-600 mt-1">Fill in the details below to add your property listing</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Form Header with Demo Button */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 font-medium">All fields are required</span>
            </div>
            <button
              type="button"
              onClick={fillDemoData}
              className="text-sm px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-blue-600 font-medium border border-gray-200 hover:border-blue-300"
            >
              ✨ Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              
              {/* Property Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Title
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'propertyName' ? 'ring-2 ring-green-400 rounded-xl' : ''
                }`}>
                  <Home className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'propertyName' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    name="propertyName"
                    placeholder="e.g. Luxury Villa in Downtown"
                    value={formData.propertyName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('propertyName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location / Address
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'address' ? 'ring-2 ring-green-400 rounded-xl' : ''
                }`}>
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'address' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. 123 Main St, Springfield"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Price & Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'price' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <IndianRupee className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'price' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="number"
                      name="price"
                      placeholder="e.g. 5000000"
                      value={formData.price}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('price')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Listing Type
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'type' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'type' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('type')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* BHK & Area Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bedrooms (BHK)
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'bhk' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Bed className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'bhk' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="number" 
                      name="bhk" 
                      value={formData.bhk}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('bhk')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. 3" 
                      required 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area (sq ft)
                  </label>
                  <div className={`relative transition-all duration-200 ${
                    focusedField === 'area' ? 'ring-2 ring-green-400 rounded-xl' : ''
                  }`}>
                    <Square className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === 'area' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="number" 
                      name="area" 
                      value={formData.area}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('area')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. 1200" 
                      required 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Description
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'description' ? 'ring-2 ring-green-400 rounded-xl' : ''
                }`}>
                  <FileText className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
                    focusedField === 'description' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Describe the key features of your property..."
                    value={formData.description}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Status
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'status' ? 'ring-2 ring-green-400 rounded-xl' : ''
                }`}>
                  <AlertCircle className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'status' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('status')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Image
                </label>
                <div className={`relative transition-all duration-200 ${
                  focusedField === 'photo' ? 'ring-2 ring-green-400 rounded-xl' : ''
                }`}>
                  <Upload className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
                    focusedField === 'photo' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="file"
                    accept="image/*"
                    name="filetoupload"
                    onChange={handleFileChange}
                    onFocus={() => setFocusedField('photo')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                  />
                </div>
                
                {/* Image Preview */}
                {photoPreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isSubmitting 
                    ? "opacity-75 cursor-not-allowed" 
                    : "hover:from-green-600 hover:to-emerald-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading Property...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>List Property</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}