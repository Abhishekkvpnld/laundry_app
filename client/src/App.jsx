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




const App = () => {
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
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App