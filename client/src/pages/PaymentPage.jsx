import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51TIC8fDKUrXEjgp1FHp2bReDVhZmNKouHBP4dWamNP3m7bUKI02EblYtjIUcUBCgSLEAtmwOf0n5k7IFfLpwUB7G00WFMpGTTq");

export default function PaymentPage() {
  const location = useLocation();
  const { amount, propertyId } = location.state || {};
  const title = location.state?.title || "Property";

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Payment for {title}</h1>
      <p>Total Amount: ₹{amount?.toLocaleString()}</p>
      
      <Elements stripe={stripePromise}>
        {/* --- 2. PASS THE EMAIL PROP HERE --- */}
        <CheckoutForm 
          amount={amount} 
          propertyId={propertyId} 
          userEmail={userEmail} 
        />
      </Elements>
    </div>
  );
}