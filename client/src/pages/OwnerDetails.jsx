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
//     status: "" 
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
//   e.preventDefault();

//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/properties", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`   
//       },
//       body: JSON.stringify({
//         title: formData.propertyName,   
//         description: formData.description,
//         price: formData.price,
//         location: formData.address,     
//         type: formData.type,
//         status: formData.status,
//         images: [formData.image],                    
//       }),
      
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Property Added Successfully!");
//       navigate("/");
//     } else {
//       alert(data.message || "Failed to add property");
//     }

//   } catch (error) {
//     console.log(error);
//     alert("Server error");
//   }
// };

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
//             >
//             <option value="">Select Type</option>
//             <option value="rent">Rent</option>
//             <option value="sale">Sale</option>
//           </select>

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
//             value={formData.image}
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

export default function AddProperty() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    price: "",
    description: "",
    type: "",
    status: "" 
  });

  const [photo, setPhoto] = useState(null);

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
      alert("Please login first");
      return;
    }

    if (!photo) {
      alert("Please select an image to upload");
      return;
    }

    // 1. Create a FormData object instead of standard JSON
    const submitData = new FormData();
    submitData.append("title", formData.propertyName);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);
    submitData.append("location", formData.address);
    submitData.append("type", formData.type);
    submitData.append("status", formData.status);
    
    // 2. Append the physical file
    submitData.append("image", photo);

    try {
      const res = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: {
          // IMPORTANT: Do NOT set "Content-Type" to "application/json" here. 
          // The browser automatically sets it to "multipart/form-data" when it sees a FormData object.
          Authorization: `Bearer ${token}`   
        },
        body: submitData, // Send the FormData object
      });

      const data = await res.json();

      if (res.ok) {
        alert("Property Added Successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to add property");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c3e94]">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Add Property
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="propertyName"
            placeholder="Property Name"
            value={formData.propertyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            placeholder="Add Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            rows="4"
            placeholder="Add Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
            <option value="">Select Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
          <input
            type="file"
            accept="image/*"
            name="filetoupload"
            onChange={handleFileChange}
            required
            className="w-full"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}