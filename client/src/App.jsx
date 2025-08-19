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
        <Route path="/" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Service /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/details/:id" element={<ProtectedRoute><LaundryDetailsPage /></ProtectedRoute>} />

        {/* Shop Owner */}
        <Route path="/shop" element={<ProtectedRoute><ShopOwnerHome /></ProtectedRoute>} />
        <Route path="/shop/register" element={<ProtectedRoute><ShopRegister /></ProtectedRoute>} />
        <Route path="/shop/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />

        {/* Admin Panel */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminHome /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><AdminOrder /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><AdminLayout><AdminOrder /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/shops" element={<ProtectedRoute><AdminLayout><AdminShop /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><AdminLayout><AdminReports /></AdminLayout></ProtectedRoute>} />


        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App