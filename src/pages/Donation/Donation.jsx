import React, {useEffect, useState} from "react";
import {callApi} from "@/core/okSdk.js";
import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import {BiDonateHeart} from "react-icons/bi";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";
import AmountSelector from "@/components/AmountSelector/AmountSelector.jsx";
import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import PaymentMethodSelector from "@/components/PaymentMethodSelector/PaymentMethodSelector.jsx";
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";
import cn from "classnames";

const Donation = ({groupId}) => {
    const [groupName, setGroupName] = useState("");

    const [amounts, setAmounts] = useState([300, 500, 600, 700, 800, 1000]);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [minAmount, setMinAmount] = useState(10);
    const [amountError, setAmountError] = useState(null);

    const [isRecurrentPayment, setIsRecurrentPayment] = useState(true);

    const [email, setEmail] = useState("");
    const [isEmailRequired, setIsEmailRequired] = useState(true);
    const [emailError, setEmailError] = useState(null);


    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [paymentMethodError, setPaymentMethodError] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([
        {
            payTypes: ["visa", "master", "mir"],
            name: "Банковские карты",
            slug: "bank_card"
        },
        {
            payTypes: ["mir"],
            name: "Mir Pay",
            slug: "mir_pay"
        },
        {
            payTypes: ["spay"],
            name: "SberPay",
            slug: "spay"
        },
    ]);

    const toggleRecurrent = () => {
        setIsRecurrentPayment(prevState => !prevState);
    }

    const handleDonate = (amount) => {
        alert(`Вы пожертвовали ${amount} рублей!`);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidAmount = () => {
        return selectedAmount >= minAmount;
    };

    const isDonationDataValid = () => {
        console.log(paymentMethodError,
            amountError,
            emailError)
        return (!paymentMethodError && !amountError && !emailError)
    }

    // Проверка минимальной суммы
    useEffect(() => {
        setAmountError(null);
        if (!isValidAmount()) {
            setAmountError("Введите сумму от " + minAmount + "₽");
        }
    }, [selectedAmount]);

    // Проверка почты
    useEffect(() => {
        setEmailError(null)
        if (email === "" && isEmailRequired) {
            setEmailError("Не указан email")
        }

        if (email !== "" && !isValidEmail(email)) {
            setEmailError("Некорректный email");
        }
    }, [email]);

    // Проверка, что выбран метод оплаты
    useEffect(() => {
        setPaymentMethodError(null)
        if (selectedPaymentMethod === "") {
            setPaymentMethodError("Укажите способ оплаты")
        }
    }, [selectedPaymentMethod]);

    // Установка изначальной суммы
    useEffect(() => {
        setSelectedAmount(amounts[0]);
    }, [amounts]);

    // Активация кнопки
    useEffect(() => {
        setIsButtonDisabled(false);
        console.log(isDonationDataValid())
        if (!isDonationDataValid()) {
            setIsButtonDisabled(true);
        }
    }, [paymentMethodError, amountError, emailError]);


    const gid = '70000033151402';
    callApi('group.getInfo', {uids: [gid], fields: ['name']})
        .then((res) => {
            setGroupName(res[0].name);
        })

    return (
        <>
            <HeaderPanel>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <BiDonateHeart className="text-6xl"/>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-lg">Помощь&nbsp;{groupName}</div>
                            <div>Помощь некоммерческой организации</div>
                        </div>
                    </div>
                </div>
            </HeaderPanel>
            <ContentPanel>
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-base-300">Сумма пожертвования</p>
                    <div>
                        <AmountSelector amounts={amounts}
                                        onChange={setSelectedAmount}
                                        amountError={amountError}/>

                    </div>

                    <div className="relative">
                        <Input type="email"
                               className={cn("input w-full h-14 text-center", {
                                   "border-error": emailError,
                               })}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Ваш email"
                        />
                        {emailError && (
                            <div className="text-sm text-white bg-error absolute top-[-10px] px-1">{emailError}</div>)}
                    </div>

                    <PaymentMethodSelector methods={paymentMethods} onChange={setSelectedPaymentMethod}/>
                    <div>
                        <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                             onClick={() => toggleRecurrent()}>
                            <div className="text-4xl">{isRecurrentPayment ? (
                                <FiCheckSquare className="text-primary"/>
                            ) : <FiSquare className="text-base-200"/>}
                            </div>
                            <span>Повторяющийся платеж</span>

                            <div>
                                <Popover trigger={<GoQuestion className='text-xl'/>}
                                         content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                            </div>

                        </div>

                        <p className="text-xs text-base-300">Наша работа возможна благодаря вашей помощи.
                            Если вы можете помогать нам регулярно, мы сможем сделать еще больше.</p>
                    </div>

                    <Button
                        className="rounded-lg"
                        size="xl"
                        variant="secondary"
                        disabled={isButtonDisabled}
                        onClick={handleDonate}
                    >
                        Помочь
                    </Button>
                </div>

            </ContentPanel>
        </>
    );
};

export default Donation;