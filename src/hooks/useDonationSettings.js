import { useEffect, useState } from "react";
import { fetchIdentity } from "@/api/backend.js";
import { extractDonationSettings } from "@/utils/ProcessResponse.js";

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
            setSettings(processedData);
            setPaymentMethods(data.fund_form.data.fields.payType?.default || ["card"]);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
            setError(err.message || "Не удалось загрузить настройки");
        } finally {
            setIsLoading(false);
        }
    };

    // Вызов функции при первом рендере
    useEffect(() => {
        const loadSettings = async () => {
            await fetchDonationSettings();
        }

        loadSettings();
    }, []);

    return { settings, isLoading, paymentMethods, error };
};
