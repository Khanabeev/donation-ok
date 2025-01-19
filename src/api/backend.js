import {http} from "@/core/http.js";
import ServiceUnavailableError from "@/errors/ServiceUnavailableError.js";
import InvalidCodeError from "@/errors/InvalidCodeError.js";

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