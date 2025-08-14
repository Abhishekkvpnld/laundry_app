import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

// API call
const fetchUserData = async () => {
  const res = await axios.get(`${AUTH_BACKEND_URL}/user`, {
    withCredentials: true, // send cookie JWT
  });
  return res.data;
};

export const useFetchUserData = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, error, refetch, data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data) {
        console.log("✅ User data fetched:", data);
        dispatch(setUser(data));
      }
    },
  });

  return { isLoading, isError, error, refetch, data };
};
