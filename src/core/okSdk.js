export const initFAPI = (onSuccess, onError) => {
    if (!window.FAPI) {
        console.error("FAPI SDK не загружен");
        return;
    }

    window.FAPI.init(
        {
            api_server: "https://api.ok.ru/",
            api_connection: "https://connect.ok.ru/",
            use_extlinks: true,
            app_key: import.meta.env.VITE_PUBLIC_KEY,
            app_id: import.meta.env.VITE_APP_ID,
        },
        onSuccess,
        onError
    );
};

/**
 * Универсальная функция для вызова методов API Одноклассников
 * @param {string} method - Название метода API (например, "users.getCurrentUser")
 * @param {Object} params - Параметры для метода (например, { fields: "first_name,last_name" })
 * @returns {Promise<Object>} - Промис с данными ответа API
 */
export const callApi = (method, params = {}) => {
    return new Promise((resolve, reject) => {
        const apiParams = {
            ...params,
            method, // Добавляем метод в параметры
        };

        window.FAPI.Client.call(apiParams, (status, data, error) => {
            if (status === "ok") {
                resolve(data); // Успешный ответ
            } else {
                reject(error); // Ошибка
            }
        });
    });
};
