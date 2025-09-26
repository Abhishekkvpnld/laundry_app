import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  //  Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Role mismatch → redirect to login (or unauthorized page)
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated & Authorized
  return children;
};

export default ProtectedRoute;
