import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import BuyerLogin from "./pages/BuyerLogin";
import OwnerLogin from "./pages/OwnerLogin";

import Login from "./pages/Login";
import BuyerRegister from "./pages/BuyerRegister";
import OwnerRegister from "./pages/OwnerRegister";
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
    ],
  },
]);