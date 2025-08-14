import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;


export const signup = async ({ email, password, role, username, phone, file }) => {
    const res = await axios.post(
        `${AUTH_BACKEND_URL}/signup`,
        { email, password, role, username, file, phone },
        { withCredentials: true } // Store JWT in cookie
    );
    return res.data;
};

export const useSignup = () => {
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: signup,
    });

    return {
        signup: mutate,
        isLoading,
        isError,
        error,
        data,
    };
};
