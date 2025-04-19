import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/user/UserHome";
import Service from "./pages/user/Service";
import Profile from "./pages/user/Profile";
import LaundryDetailsPage from "./pages/user/Details";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<UserHome/>}/>
        <Route path="/services" element={<Service/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/details/:id" element={<LaundryDetailsPage/>} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App