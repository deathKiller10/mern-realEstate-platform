import { createBrowserRouter, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import BuyerLogin from "./pages/BuyerLogin";
import OwnerLogin from "./pages/OwnerLogin";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";

import Login from "./pages/Login";
import BuyerRegister from "./pages/BuyerRegister";
import OwnerRegister from "./pages/OwnerRegister";
import OwnerDetails from "./pages/OwnerDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
import OwnerDashboard from "./pages/OwnerDashboard";

import OwnerProtectedRoute from "./pages/OwnerProtectedRoute";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard"; 
import Inbox from "./pages/Inbox";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} 
      />

      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { Component: Home, index: true },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "buyerlogin", Component: BuyerLogin },
      { path: "ownerlogin", Component: OwnerLogin },
      { path: "buyerregister", Component: BuyerRegister },
      { path: "ownerregister", Component: OwnerRegister },
      { path: "properties", Component: Properties },
      { path: "inbox", Component: Inbox },
      
      { path: "property/:id", Component: PropertyDetails }, 
      
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "search", Component: Search },
      { 
        path: "ownerdashboard", 
        element: (
          <OwnerProtectedRoute>
            <OwnerDashboard />
          </OwnerProtectedRoute>
        ) 
      },
      { 
        path: "ownerdetails", 
        element: (
          <OwnerProtectedRoute>
            <OwnerDetails />
          </OwnerProtectedRoute>
        ) 
      },
      { 
        path: "admindashboard", 
        element: (
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        ) 
      },
    ],
  },
]);