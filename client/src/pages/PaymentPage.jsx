import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { 
  CreditCard, 
  Shield, 
  Lock, 
  ArrowLeft,
  Home,
  IndianRupee,
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51TIC8fDKUrXEjgp1FHp2bReDVhZmNKouHBP4dWamNP3m7bUKI02EblYtjIUcUBCgSLEAtmwOf0n5k7IFfLpwUB7G00WFMpGTTq");

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, propertyId } = location.state || {};
  const title = location.state?.title || "Property";
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  const propertyPrice = amount || 0;
  const tokenAmount = Math.round(propertyPrice * 0.01); 
  const convenienceFee = 999; 
  const gst = Math.round(convenienceFee * 0.18); 
  const totalAmount = tokenAmount + convenienceFee + gst;

  if (!amount || !propertyId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Invalid Payment Session</h2>
          <p className="text-gray-600 mb-6">
            No payment information found. Please select a property to continue with the booking.
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Properties</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Property</span>
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Complete Payment</h1>
              <p className="text-gray-600 mt-1">Secure checkout for your booking</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Payment Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Property Summary */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Booking confirmation will be sent to {userEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stripe Payment Form */}
              <div className="p-6 md:p-8">
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    amount={totalAmount} 
                    propertyId={propertyId} 
                    userEmail={userEmail} 
                  />
                </Elements>
              </div>
            </div>

            {/* Security Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>100% Protected</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <h3 className="text-xl font-bold mb-1">Order Summary</h3>
                <p className="text-sm text-gray-300">Review your payment details</p>
              </div>

              <div className="p-6">
                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Property Value</span>
                    <span className="font-medium text-gray-500 flex items-center text-sm">
                      <IndianRupee className="w-3 h-3" />
                      {propertyPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-800 font-semibold">Booking Token (1%)</span>
                    <span className="font-bold text-gray-900 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {tokenAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Convenience Fee</span>
                      <button
                        onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {convenienceFee.toLocaleString()}
                    </span>
                  </div>

                  {showSecurityInfo && (
                    <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700 mb-2">
                      Non-refundable platform fee for secure processing, legal documentation, and broker matching.
                    </div>
                  )}

                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-600">GST (18% on fee)</span>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {gst.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900">Total Payable Now</span>
                    <span className="text-2xl font-bold text-green-600 flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">We Accept</p>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <span className="text-xs text-gray-600">Visa</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <span className="text-xs text-gray-600">Mastercard</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <span className="text-xs text-gray-600">Amex</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <span className="text-xs text-gray-600">UPI</span>
                    </div>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">100% Secure Payment</p>
                      <p className="text-xs text-gray-600">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By completing this payment, you agree to our Terms of Service and Privacy Policy.
            All transactions are secured by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}