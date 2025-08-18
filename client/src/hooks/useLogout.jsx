import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const logoutUser = async () => {
  const res = await axios.get(`${AUTH_BACKEND_URL}/logout`, {
    withCredentials: true,
  });
  return res.data;
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Logout error:", err);
      dispatch(clearUser());
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  return mutation; 
};
