import { useState } from "react";

export default function AddProperty() {
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    price: "",
    description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property Details Submitted!");
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

          <input
            type="file"
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