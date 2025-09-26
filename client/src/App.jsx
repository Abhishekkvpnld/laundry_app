import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// 🔑 Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 👤 User Pages
import UserHome from "./pages/user/UserHome";
import Service from "./pages/user/Service";
import Profile from "./pages/user/Profile";
import LaundryDetailsPage from "./pages/user/Details";

// 🏪 Shop Owner Pages
import ShopOwnerHome from "./pages/shop/Home";
import ShopRegister from "./pages/shop/ShopRegister";
import OrderHistory from "./pages/shop/OrderHistory";

// 🛠 Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrder from "./components/admin/AdminOrder";
import AdminServices from "./components/admin/AdminServices";
import AdminShop from "./components/admin/AdminShop";
import AdminSettings from "./components/admin/AdminSettings";
import AdminReports from "./components/admin/AdminReports";

// ⚙️ State & Helpers
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./redux/authSlice";
import ProtectedRoute from "@/helper/ProtectedRoute";
import NotFound from "./helper/NotFound";
import ShopOwnerProfile from "./pages/shop/ShopOwnerProfile";
import Booking from "./pages/user/Booking";
import PaymentSuccess from "./pages/user/PaymentSuccess";
import PaymentError from "./pages/user/PaymentError";

// 🌍 Backend URL
const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const App = () => {
  const dispatch = useDispatch();

  // ✅ Memoized fetchUser
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${AUTH_BACKEND_URL}/user`, {
        withCredentials: true,
      });
      if (res?.data?.data) {
        dispatch(setUser(res.data.data));
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(clearUser());
      console.error("Auth fetch error:", err);
    }
  }, [dispatch]);

  // 🔄 Load user on app mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <Routes>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route path="/" element={<ProtectedRoute role={"user"}><UserHome /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute role={"user"}><Service /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute role={"user"}><Profile /></ProtectedRoute>} />
        <Route path="/details/:id" element={<ProtectedRoute role={"user"}><LaundryDetailsPage /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute role={"user"}><Booking /></ProtectedRoute>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentError />} />


        {/* Shop Owner */}
        <Route path="/shop" element={<ProtectedRoute role={'shop'}><ShopOwnerHome /></ProtectedRoute>} />
        <Route path="/shop/register" element={<ProtectedRoute role={'shop'}><ShopRegister /></ProtectedRoute>} />
        <Route path="/shop/orders" element={<ProtectedRoute role={'shop'}><OrderHistory /></ProtectedRoute>} />
        <Route path="/shop/profile" element={<ProtectedRoute role={'shop'}><ShopOwnerProfile /></ProtectedRoute>} />

        {/* Admin Panel */}
        <Route path="/admin" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminHome /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminOrder /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminOrder /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/shops" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminShop /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute role={"admin"}><AdminLayout><AdminReports /></AdminLayout></ProtectedRoute>} />


        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App