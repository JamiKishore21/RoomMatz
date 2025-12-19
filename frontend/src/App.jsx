import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Information from "../pages/Information";
import Vacancy from "../pages/Vacancy";
import ForgotPassword from "../pages/ForgotPassword";
import BillPayment from "../pages/BillPayment";
import ResetPassword from "../pages/ResetPassword";
import VerifyCode from "../pages/VerifyCode";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import UserProfile from "../pages/UserProfile";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);



  // Don't show global navbar on admin dashboard or admin login pages
  const hideNavbar = location.pathname === '/admin-dashboard' || location.pathname === '/admin-login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> {/* ✅ Added "/home" route */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />      {/* ✅ About Us Page */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/information" element={<Information />} />
        <Route path="/vacancy" element={<Vacancy />} />
        <Route path="/billpayment" element={<BillPayment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
};

export default App;
