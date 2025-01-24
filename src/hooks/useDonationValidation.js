import { useState, useEffect } from "react";

export const useDonationValidation = (settings) => {
    const [email, setEmail] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [isRecurrentPayment, setIsRecurrentPayment] = useState(true);
    const [emailError, setEmailError] = useState(null);
    const [amountError, setAmountError] = useState(null);
    const [paymentMethodError, setPaymentMethodError] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const toggleRecurrent = () => setIsRecurrentPayment(!isRecurrentPayment);

    useEffect(() => {
        setAmountError(null);
        if (selectedAmount < settings?.formSettings.sum.minAmount) {
            setAmountError(`Введите сумму от ${settings.formSettings.sum.minAmount}₽`);
        }
    }, [selectedAmount, settings]);

    useEffect(() => {
        setEmailError(null);
        if (!email.includes("@")) {
            setEmailError("Некорректный email");
        }
    }, [email]);

    useEffect(() => {
        setIsButtonDisabled(
            Boolean(emailError || amountError || paymentMethodError)
        );
    }, [emailError, amountError, paymentMethodError]);

    return {
        email,
        selectedAmount,
        isRecurrentPayment,
        emailError,
        amountError,
        paymentMethodError,
        isButtonDisabled,
        setEmail,
        setSelectedAmount,
        setSelectedPaymentMethod: () => {}, // Dummy, replace with logic
        toggleRecurrent,
    };
};
