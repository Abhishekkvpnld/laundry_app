import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/user/UserHome";
import Service from "./pages/user/Service";
import Profile from "./pages/user/Profile";
import LaundryDetailsPage from "./pages/user/Details";
import ShopOwnerHome from "./pages/shop/Home";
import ShopRegister from "./pages/shop/ShopRegister";
import OrderHistory from "./pages/shop/OrderHistory";
import AdminHome from "./pages/admin/AdminHome";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrder from "./components/admin/AdminOrder";
import AdminServices from "./components/admin/AdminServices";
import AdminShop from "./components/admin/AdminShop";
import AdminSettings from "./components/admin/AdminSettings";
import AdminReports from "./components/admin/AdminReports";
import { useFetchUserData } from "./hooks/useFetchUser";




const App = () => {

  //Fetch User Data
  useFetchUserData();

  return (
    <Router>
      <Routes>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route path="/" element={<UserHome />} />
        <Route path="/services" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<LaundryDetailsPage />} />

        {/* Shop Owner */}
        <Route path="/shop" element={<ShopOwnerHome />} />
        <Route path="/shop/register" element={<ShopRegister />} />
        <Route path="/shop/orders" element={<OrderHistory />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout><AdminHome /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrder /></AdminLayout>} />
        <Route path="/admin/customers" element={<AdminLayout><AdminOrder /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
        <Route path="/admin/shops" element={<AdminLayout><AdminShop /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />

      </Routes>
      <Toaster />
    </Router>
  )
}

export default App