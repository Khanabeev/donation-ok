import {fetchIdentity} from "@/api/backend.js";
import {extractDonationSettings} from "@/utils/ProcessResponse.js";
import {useEffect, useState} from "react";

export const useDonationSettings = (groupId) => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [error, setError] = useState(null);

    const fetchDonationSettings = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchIdentity(groupId);
            const processedData = extractDonationSettings(data);

            if (!processedData) {
                throw new Error("Не удалось обработать настройки пожертвований");
            }

            setSettings(processedData);
            setPaymentMethods(processedData?.formSettings?.payType?.default || ["card"]);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
            setError(err.message || "Не удалось загрузить настройки");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDonationSettings();
    }, []);

    return { settings, isLoading, paymentMethods, error };
};
