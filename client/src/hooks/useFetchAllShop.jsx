import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SHOP_BACKEND_URL = import.meta.env.VITE_SHOP_SERVICE_URL;


const fetchAllShops = async () => {
    const { data } = await axios.get(`${SHOP_BACKEND_URL}/all-shops`, { withCredentials: true });
    return data?.data;
}


export const useFetchAllShop = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ["All_Shops"],
        queryFn: fetchAllShops
    })

    return { data, isError, isLoading }

}