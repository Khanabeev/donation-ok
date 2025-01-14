import OKSDK from "ok-js-sdk";

const OK_APP_ID = process.env.REACT_APP_OK_APP_ID;
const OK_APP_KEY = process.env.REACT_APP_OK_SECRET_KEY;

/**
 * Инициализация OK SDK
 */
export const initSdk = async () => {
    return new Promise((resolve, reject) => {
        OKSDK.init(
            {
                app_id: OK_APP_ID,
                app_key: OK_APP_KEY,
                oauth: {
                    scope: "VALUABLE_ACCESS",
                    url: process.env.REACT_APP_OK_REDIRECT_URI,
                },
            },
            () => resolve(OKSDK),
            (error) => reject(error)
        );
    });
};

/**
 * Вызов REST API
 */
export const callApi = async (method, params = {}) => {
    return new Promise((resolve, reject) => {
        OKSDK.REST.call(method, params, (status, data, error) => {
            if (status === "ok") resolve(data);
            else reject(error);
        });
    });
};

/**
 * Открытие платежа
 */
export const showPayment = (productName, productPrice, productCode) => {
    OKSDK.Payment.show(productName, productPrice, productCode);
};
