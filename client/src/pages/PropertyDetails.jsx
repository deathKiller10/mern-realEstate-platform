import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load property details.");
        navigate("/properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-500">Loading details...</h2>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-blue-600 hover:underline font-medium"
      >
        &larr; Back to Results
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image & Core Details */}
        <div className="w-full md:w-2/3 flex flex-col">
          <img
            src={`http://localhost:5000/${property.images?.[0]}`}
            alt={property.title}
            className="w-full h-96 object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=No+Image" }}
          />
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
              <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${property.type === 'rent' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                For {property.type}
              </span>
            </div>
            
            <p className="text-gray-500 text-lg mb-6 flex items-center gap-2">
              📍 {property.location}
            </p>

            <h3 className="text-xl font-semibold mb-2 border-b pb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        </div>

        {/* Right Side: Price & Contact Card */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 md:p-8 border-l border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-gray-500 font-medium mb-1">Asking Price</p>
            <p className="text-4xl font-bold text-blue-600 mb-8">
              ₹ {property.price.toLocaleString("en-IN")}
            </p>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Contact Owner</h3>
              <p className="font-medium text-gray-700 text-lg mb-1">{property.owner?.name}</p>
              <p className="text-gray-600 mb-4">📧 {property.owner?.email}</p>
              
              <a 
                href={`mailto:${property.owner?.email}?subject=Interested in ${property.title}`}
                className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Email
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            Listed on {new Date(property.createdAt).toLocaleDateString()}
            <br/>
            Status: <span className="font-semibold text-gray-600 uppercase">{property.status}</span>
          </div>
        </div>

      </div>
    </div>
  );
}