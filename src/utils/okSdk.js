export const initFAPI = (appId, appKey, onSuccess, onError) => {

    if (!window.FAPI) {
        console.error("FAPI SDK не загружен");
        return;
    }

    window.FAPI.init(
        {
            api_server: "https://api.ok.ru/",
            api_connection: "https://connect.ok.ru/",
            app_id: appId,
            app_key: appKey,
        },
        onSuccess,
        onError
    );
};

export const callApi = (method, params) => {
    return new Promise((resolve, reject) => {
        window.FAPI.Client.call(
            method,
            params,
            (status, data, error) => {
                if (status === "ok") resolve(data);
                else reject(error);
            }
        );
    });
};
