import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CheckoutForm = ({ amount, propertyId, userEmail}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(""); // Clear previous errors

    

    try {
      // 1. Request Secret from Backend (via API Gateway)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amount,
          currency: "inr",
          propertyId: propertyId,
          buyerEmail:userEmail
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to payment server. Check if Payment Service is running.");
      }

      const { clientSecret } = await response.json();

      // 2. Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // Show error from Stripe (e.g., card declined)
        setErrorMessage(result.error.message);
        setIsProcessing(false);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        try {
          // 3. Update the Property status in the database
          const token = localStorage.getItem("token");
          const updateRes = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/book`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ 
            propertyId: propertyId, 
            buyerEmail: userEmail // <-- Ensure 'userEmail' actually has a value here!
            }),
          });
          // navigate("/my-bookings");
          if (!updateRes.ok) throw new Error("Payment succeeded but failed to update booking status.");

          try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/wishlist/${propertyId}`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${token}` }
            });
          } catch (wishlistErr) {
            console.log("Non-critical: Could not scrub from wishlist", wishlistErr);
          }

          // 4. Update UI state
          setSuccess(true);
          setIsProcessing(false);

          // 5. Redirect after a short delay
          setTimeout(() => navigate("/my-bookings"), 2500);
          
        } catch (dbErr) {
          console.error("DB update error:", dbErr);
          setErrorMessage("Payment successful, but we had trouble updating the property list. Please contact support.");
          setIsProcessing(false);
        }
      }
    } catch (err) {
      setErrorMessage(err.message);
      setIsProcessing(false);
    }
  };

  // If payment is successful, show this screen with the Green Tick
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in duration-500">
        {/* The Animated Green Tick */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-green-50 transition-all transform hover:scale-105">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Congratulations! The property has been successfully booked.
        </p>
        
        {/* Loading spinner for the redirect */}
        <div className="flex items-center justify-center gap-3 text-sm font-medium text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          Redirecting to your bookings...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }} />
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isProcessing ? "Verifying Transaction..." : `Confirm Payment`}
      </button>
    </form>
  );
};

export default CheckoutForm;