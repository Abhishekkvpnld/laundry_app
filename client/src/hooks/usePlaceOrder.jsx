import { ORDER_API_END_POINT } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner"

// API call
const createOrder = async (data) => {
  const res = await axios.post(
    `${ORDER_API_END_POINT}/place-order`,
    data,
    { withCredentials: true }
  );
  return res.data;
};

// Custom hook
export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("✅ Order placed successfully:", data);
      toast.success("Order placed successfully!");
    },
    onError: (error) => {
      console.error("❌ Order failed:", error);
      toast.error("Something went wrong: Order failed");
    },
  });
};
