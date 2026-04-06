import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Authcontext";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBuyNow = (property) => {
  navigate("/payment", { 
    state: { 
      amount: property.price, // or item.price
      title: property.title,
      propertyId: property._id // <--- Make sure this exists!
    } 
  });
};

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
  src={
    property.images?.[0] 
      ? `http://localhost:5000/uploads/${property.images[0].split('/').pop()}` 
      : "https://via.placeholder.com/400x200?text=No+Image"
  }
  alt={property.title}
  className="w-full h-96 object-cover"
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

        {/* Right Side: Price & Contact Form */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 md:p-8 border-l border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-gray-500 font-medium mb-1">Asking Price</p>
            <p className="text-4xl font-bold text-blue-600 mb-8">
              ₹ {property.price.toLocaleString("en-IN")}
            </p>

            {/* NEW IN-APP MESSAGING FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Contact Owner</h3>
              
              {/* 1. First, check if the property is actually available */}
              {property.status !== "available" ? (
                <div className="text-center py-6 bg-gray-100 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-bold text-lg">Not Available</p>
                  <p className="text-gray-600 mt-2">
                    This property is currently marked as <span className="font-bold uppercase text-red-500">{property.status}</span>.
                  </p>
                </div>
              ) : !user ? (
                /* 2. Then, check if the user is logged in */
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Please log in to contact the property owner.</p>
                  <button 
                    onClick={() => navigate('/buyerlogin')} 
                    className="w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 transition"
                  >
                    Login to Message
                  </button>
                </div>
              ) : user.id === property.owner._id ? (
                /* 3. Then, prevent owners from messaging themselves */
                <div className="text-center py-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-800 font-semibold">This is your listing.</p>
                  <p className="text-sm text-blue-600 mt-1">You cannot send an inquiry to yourself.</p>
                </div>
              ) : (
                /* 4. Finally, show the form to valid buyers */
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const text = e.target.message.value;
                    try {
                      const token = localStorage.getItem("token");
                      await axios.post("http://localhost:5000/api/messages/send", {
                        propertyId: property._id,
                        receiverId: property.owner._id,
                        text: text
                      }, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      alert("Message sent successfully! Check your Inbox.");
                      e.target.reset();
                    } catch (error) {
                      alert("Failed to send message.");
                    }
                  }} 
                  className="flex flex-col gap-3"
                >
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Hi, I am interested in this property..." 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  ></textarea>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Send Message
                  </button>
                  <br/>
                  <button 
                      onClick={() => handleBuyNow(property)} 
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold mb-2 transition"
                    >
                      Buy Now
                    </button>
                </form>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            Listed by {property.owner?.name} on {new Date(property.createdAt).toLocaleDateString()}
          </div>
        </div>

      </div>
    </div>
  );
}