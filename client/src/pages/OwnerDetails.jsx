// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddProperty() {
//   const navigate = useNavigate(); 
//   const [formData, setFormData] = useState({
//     propertyName: "",
//     address: "",
//     price: "",
//     description: "",
//     type: "",
//     status: "",
//     bhk: "",  // ADDED: initialize bhk
//     area: ""  // ADDED: initialize area
//   });

//   const [photo, setPhoto] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     if (!photo) {
//       alert("Please select an image to upload");
//       return;
//     }

//     // 1. Create a FormData object
//     const submitData = new FormData();
//     submitData.append("title", formData.propertyName);
//     submitData.append("description", formData.description);
//     submitData.append("price", formData.price);
//     submitData.append("location", formData.address);
//     submitData.append("type", formData.type);
//     submitData.append("status", formData.status);
    
//     // FIXED: Use submitData, and grab the values from your formData state
//     submitData.append("bhk", formData.bhk); 
//     submitData.append("area", formData.area); 
    
//     // 2. Append the physical file
//     submitData.append("image", photo);

//     try {
//       const res = await fetch("http://localhost:5000/api/properties", {
//         method: "POST",
//         headers: {
//           // The browser automatically sets "multipart/form-data" 
//           Authorization: `Bearer ${token}`   
//         },
//         body: submitData, 
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Property Added Successfully!");
//         navigate("/");
//       } else {
//         alert(data.message || "Failed to add property");
//       }

//     } catch (error) {
//       console.log(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#2c3e94]">
//       <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
//           Add Property
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="propertyName"
//             placeholder="Property Name"
//             value={formData.propertyName}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Add Price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <textarea
//             name="description"
//             rows="4"
//             placeholder="Add Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             >
//             <option value="">Select Type</option>
//             <option value="rent">Rent</option>
//             <option value="sale">Sale</option>
//           </select>
          
//           {/* FIXED: Added value and onChange to BHK */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Bedrooms (BHK)</label>
//             <input 
//               type="number" 
//               name="bhk" 
//               value={formData.bhk}
//               onChange={handleChange}
//               placeholder="e.g. 2, 3, 4" 
//               required 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* FIXED: Added value and onChange to Area */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Plot Area (sq ft)</label>
//             <input 
//               type="number" 
//               name="area" 
//               value={formData.area}
//               onChange={handleChange}
//               placeholder="e.g. 1200" 
//               required 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
          
//           <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md"
//             >
//             <option value="">Select Status</option>
//             <option value="available">Available</option>
//             <option value="sold">Sold</option>
//             <option value="rented">Rented</option>
//           </select>
//           <input
//             type="file"
//             accept="image/*"
//             name="filetoupload"
//             onChange={handleFileChange}
//             required
//             className="w-full"
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // 1. Import toast

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
  
  // 2. Add state to track form submission
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
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

    // 3. Set submitting state to true to disable the button
    setIsSubmitting(true);
    
    // Start a loading toast
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
        navigate("/ownerdashboard"); // It's usually better to send them back to their dashboard!
      } else {
        toast.error(data.message || "Failed to add property", { id: toastId });
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.", { id: toastId });
    } finally {
      // 4. Always turn off the submitting state, even if it fails
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c3e94] py-10">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 border-b pb-4">
          List a New Property
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Title</label>
            <input
              type="text"
              name="propertyName"
              placeholder="e.g. Luxury Villa in Downtown"
              value={formData.propertyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Address</label>
            <input
              type="text"
              name="address"
              placeholder="e.g. 123 Main St, Springfield"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 5000000"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Listing Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              >
                <option value="" disabled>Select Type</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms (BHK)</label>
              <input 
                type="number" 
                name="bhk" 
                value={formData.bhk}
                onChange={handleChange}
                placeholder="e.g. 3" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Area (sq ft)</label>
              <input 
                type="number" 
                name="area" 
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. 1200" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the key features of your property..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            >
              <option value="" disabled>Select Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Image</label>
            <input
              type="file"
              accept="image/*"
              name="filetoupload"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
            />
          </div>

          {/* 5. Update the button to use the isSubmitting state */}
          <button
            type="submit"
            disabled={isSubmitting} // Disable when true
            className={`w-full py-4 rounded-lg font-bold text-lg shadow-md transition-all duration-300 mt-6 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg text-white"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading Details...
              </span>
            ) : "List Property"}
          </button>
        </form>
      </div>
    </div>
  );
}