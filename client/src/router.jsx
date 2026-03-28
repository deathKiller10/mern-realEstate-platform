import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import BuyerLogin from "./pages/BuyerLogin";
import OwnerLogin from "./pages/OwnerLogin";
import Properties from "./pages/Properties";

import Login from "./pages/Login";
import BuyerRegister from "./pages/BuyerRegister";
import OwnerRegister from "./pages/OwnerRegister";
import OwnerDetails from "./pages/OwnerDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
//import OwnerProtectedRoute from "./pages/OwnerProtectedRoute";
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ===== Router ===== */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {  Component: Home },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "buyerlogin", Component: BuyerLogin },
      { path: "ownerlogin", Component: OwnerLogin },
      { path: "buyerregister", Component: BuyerRegister },
      { path: "ownerregister", Component: OwnerRegister },
      {path:"ownerdetails", Component:OwnerDetails},
      {path:"properties", Component:Properties},
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      //{path:"ownerprotectedroute", Component:OwnerProtectedRoute},
      { path: "search", Component: Search },
    ],
  },
]);