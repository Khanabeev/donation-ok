import { useState, useEffect } from "react";

export const useDonationValidation = (settings) => {
    const [email, setEmail] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [isRecurrentPayment, setIsRecurrentPayment] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [amountError, setAmountError] = useState(null);
    const [paymentMethodError, setPaymentMethodError] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Установка первой доступной суммы
    useEffect(() => {
        if (settings?.formSettings?.sum?.badges?.length) {
            const firstAmount = settings.formSettings.sum.badges[0].value;
            setSelectedAmount(firstAmount);
        }
    }, [settings]);

    // Проверка email
    useEffect(() => {
        setEmailError(null);

        if (!email) {
            setEmailError("Введите email");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Некорректный email");
        }
    }, [email]);

    // Проверка суммы
    useEffect(() => {
        setAmountError(null);

        const minAmount = settings?.formSettings?.sum?.min || 10;
        if (selectedAmount < minAmount) {
            setAmountError(`Введите сумму от ${minAmount}₽`);
        }
    }, [selectedAmount, settings]);

    // Проверка метода оплаты
    useEffect(() => {
        setPaymentMethodError(null);

        if (!selectedPaymentMethod) {
            setPaymentMethodError("Выберите способ оплаты");
        }
    }, [selectedPaymentMethod]);

    // Проверка состояния кнопки
    useEffect(() => {
        setIsButtonDisabled(
            Boolean(emailError || amountError || paymentMethodError)
        );
    }, [emailError, amountError, paymentMethodError]);

    const toggleRecurrent = () => setIsRecurrentPayment(!isRecurrentPayment);

    return {
        email,
        selectedAmount,
        isRecurrentPayment,
        selectedPaymentMethod,
        emailError,
        amountError,
        paymentMethodError,
        isButtonDisabled,
        setEmail,
        setSelectedAmount,
        setSelectedPaymentMethod,
        toggleRecurrent,
    };
};
