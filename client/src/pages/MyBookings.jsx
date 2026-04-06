// src/pages/MyBookings.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Or however you store auth
const userEmail = user?.email; 

useEffect(() => {
  const fetchBookings = async () => {
    try {
      // Ensure the key 'email' here matches 'req.query.email' in your backend
      const res = await axios.get(`http://localhost:5000/api/properties/my-bookings`, {
        params: { email: userEmail } 
      });
      console.log("Bookings found:", res.data);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  if (userEmail) fetchBookings();
}, [userEmail]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Purchased Properties</h1>
      {bookings.length === 0 ? (
        <p>You haven't bought any properties yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow">
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-green-600">Status: {p.status}</p>
              <p>📍 {p.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}