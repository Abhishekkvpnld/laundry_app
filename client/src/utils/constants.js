export const BASE_AUTH_URL = import.meta.env.VITE_AUTH_SERVICE_URL;
export const BASE_SHOP_URL = import.meta.env.VITE_SHOP_SERVICE_URL;
export const BASE_ORDER_URL = import.meta.env.VITE_ORDER_SERVICE_URL

export const USER_API_END_POINT = `${BASE_AUTH_URL}/user`;
export const SHOP_API_END_POINT = `${BASE_SHOP_URL}`;
export const ORDER_API_END_POINT = `${BASE_ORDER_URL}`
