import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const loginUser = async ({ email, password, role }) => {
  const res = await axios.post(
    `${AUTH_BACKEND_URL}/login`,
    { email, password, role },
    { withCredentials: true } //JWT cookie is stored
  );
  return res.data; 
};

export const useLogin = () => {
  const dispatch = useDispatch();

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      // Store user in Redux
      dispatch(setUser(userData?.user));
    },
  });

  return { mutate, isLoading, isError, error, data };
};
