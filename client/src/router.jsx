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
//import OwnerProtectedRoute from "./pages/OwnerProtectedRoute";
function Layout() {
  return (
    <div>
        <Header />
        <div style={{ minHeight: "70vh", padding: "20px" }}><Outlet /></div>
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
      { index: true},
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "buyerlogin", Component: BuyerLogin },
      { path: "ownerlogin", Component: OwnerLogin },
      { path: "buyerregister", Component: BuyerRegister },
      { path: "ownerregister", Component: OwnerRegister },
      {path:"ownerdetails", Component:OwnerDetails},
      {path:"properties", Component:Properties},
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> }
      //{path:"ownerprotectedroute", Component:OwnerProtectedRoute},
    ],
  },
]);