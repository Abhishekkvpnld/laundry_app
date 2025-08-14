// src/hooks/useLogout.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/authSlice"; 

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const logoutUser = async () => {
  const res = await axios.post(
    `${AUTH_BACKEND_URL}/logout`,
    {},
    { withCredentials: true } // ensure cookie gets cleared
  );
  return res.data;
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const { mutate, isPending: isLoading, isError, error, data } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(clearUser()); // clear user from Redux store
    },
  });

  return { logout: mutate, isLoading, isError, error, data };
};
