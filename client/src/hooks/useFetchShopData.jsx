import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SHOP_BACKEND_URL = import.meta.env.VITE_SHOP_SERVICE_URL;

const fetchShopData = async () => {
  const res = await axios.get(`${SHOP_BACKEND_URL}/get-shop`, {
    withCredentials: true, // JWT cookie is stored
  });
  return res.data;
};

export const useFetchShopData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shopData"],
    queryFn: fetchShopData,
  });

  return { data, isLoading, isError, error };
};
