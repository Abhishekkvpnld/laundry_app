import { ORDER_API_END_POINT } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"

// API call
const createOrder = async (orderData) => {
    try {

        const response = await axios.post(
            `${ORDER_API_END_POINT}/place-order`,
            orderData,
            { withCredentials: true }
        );

        return response?.data?.order;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error.response?.data?.message || error.message || "Order failed";
    }
};

// Custom hook
export const usePlaceOrder = () => {
    return useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            toast.success("Order placed successfully!");
        },
        onError: (error) => {
            console.error("❌ Order failed:", error);
            toast.error("Something went wrong: Order failed");
        },
    });
};
