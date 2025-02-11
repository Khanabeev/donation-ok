import {http} from "@/core/http.js";
import ServiceUnavailableError from "@/errors/ServiceUnavailableError.js";
import InvalidCodeError from "@/errors/InvalidCodeError.js";
import GroupNotFoundError from "@/errors/GroupNotFoundError.js";

export const registerGroup = async (groupId, clientId, token) => {
    await http.post('/fapi/vk/group-link',
        {},
        {
            params: {
                id: clientId,
                gid: groupId,
                app_id: import.meta.env.VITE_APP_ID,
                client: "ok"
            },
            headers: {Authorization: `Bearer ${token}`}
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new InvalidCodeError();
            }

            throw new ServiceUnavailableError();
        })
}

export const fetchIdentity = async (groupId, targetId) => {
    try {
        const response = await http.get(`/fapi/vk/info`, {
            params: {
                gid: groupId,
                targetId: targetId || null,
            },
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        const {status} = error.response;
        switch (status) {
            case 404:
                throw new GroupNotFoundError();
            default:
                console.error("Ошибка при получении данных:", error);
                throw new ServiceUnavailableError();
        }

    }
};
