import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SHOP_BACKEND_URL = import.meta.env.VITE_SHOP_SERVICE_URL;

const fetchShopData = async (id) => {
    const res = await axios.get(`${SHOP_BACKEND_URL}/get-shop/${id}`, {
        withCredentials: true, // JWT cookie is stored
    });
    return res.data?.data;
};

export const useFetchShopDataById = (id) => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchShopData(id),
        enabled: !!id, // only fetch when id is available
    });

    return { data, isLoading, isError, error };
};
