import axios from 'axios';
import AuthStorage from "@/utils/AuthStorage.js";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use((config) => ({
    ...config,
    headers: {
        ...config.headers,
        // Authorization: `Bearer ${new AuthStorage().getToken()}`,
    },
}));

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response;

        switch (status) {
            case 401:
                console.error('not authorize', error);
                new AuthStorage().removeToken();
                break;
            default:
                break;
        }

        throw error;
    },
);