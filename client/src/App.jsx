import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/user/UserHome";
import Service from "./pages/user/Service";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<UserHome/>}/>
        <Route path="/services" element={<Service/>}/>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App