import axios from "axios";

const API_BASE = "https://api.ok.ru/api";

export const getUserInfo = async (accessToken) => {
    const response = await axios.get(`${API_BASE}/users/getCurrentUser`, {
        params: { access_token: accessToken },
    });
    return response.data;
};
