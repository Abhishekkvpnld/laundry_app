import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AUTH_BACKEND_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const useFetchUserData = (shouldFetch) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldFetch) return;

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${AUTH_BACKEND_URL}/user`, { withCredentials: true });
                dispatch(setUser(res?.data?.data));
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [shouldFetch, dispatch]);
};
