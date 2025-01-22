import {useEffect, useState} from "react";
import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";
import AmountSelector from "@/components/AmountSelector/AmountSelector.jsx";
import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import PaymentMethodSelector from "@/components/PaymentMethodSelector/PaymentMethodSelector.jsx";
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";
import cn from "classnames";
import PropTypes from "prop-types";
import {fetchIdentity} from "@/api/backend.js";
import {extractDonationSettings} from "@/utils/ProcessResponse.js";
import {generateToken} from "@/utils/JwtHelper.js";

const Donation = ({groupId, userId}) => {
    groupId = '70000033151402';
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({});
    const [groupName, setGroupName] = useState("");
    const [projectId, setProjectId] = useState(356613);

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

    const getPayload = () => {
        return {
            "uid": userId, // id пользователя
            "project_id": projectId, //Идентификатор проекта пожертвования. Здесь не совсем понятно, это айдишник группы?
            "utm_source": "ok",  //Источник трафика (UTM-метка).
            "utm_medium": "social", //Тип трафика (UTM-метка).
            "target_id": null, //Идентификатор адресного сбора (если есть).
            "source_url": settings.generalInfo.landingUrl, //URL для перенаправления после успешного пожертвования.
            "name": settings.userInfo.name,
            "email": email,
            "phone": "",
            "comment": "",
            "sum": selectedAmount, // Выбранная сумма пожертвования (Можно только это поле оставить?)
            "repeat": isRecurrentPayment,
            "payment_method": "card", // Метод оплаты
            "iat": 1692172800 // Метка создания токена
        }
    }

    const handleDonate = () => {
        const payload = getPayload()
        generateToken(payload, 'vk').then((token) => {
            console.log("JWT:", token);
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidAmount = () => {
        return selectedAmount >= minAmount;
    };

    const isDonationDataValid = () => {
        return (!paymentMethodError && !amountError && !emailError)
    }

    // Получение информации о группе
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await fetchIdentity(groupId);
                const processedData = extractDonationSettings(data)
                setSettings(processedData);
            } catch (err) {
                console.log(err.message || "Ошибка загрузки данных");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
        if (!isDonationDataValid()) {
            setIsButtonDisabled(true);
        }
    }, [paymentMethodError, amountError, emailError]);

    if(Object.keys(settings).length === 0) {
        return (
            <div>Загрузка...</div>
        )
    }
    return (
        <>
            <HeaderPanel>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <img
                            src={settings.generalInfo.fundLogo}
                            alt={settings.generalInfo.fundName}
                            className="rounded-full w-16 h-16"
                        />
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-lg">Помощь&nbsp;{settings.generalInfo.fundName}</div>
                            <div>{settings.generalInfo.header}</div>
                        </div>
                    </div>
                </div>
            </HeaderPanel>
            <ContentPanel>
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-base-300">Сумма пожертвования</p>

                    <AmountSelector amounts={settings.formSettings.sum.badges.map((item)=> item.value ?? null)}
                                    onChange={setSelectedAmount}
                                    amountError={amountError}/>


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
                            <span>{settings.formSettings.repeat.text}</span>

                            <div>
                                <Popover trigger={<GoQuestion className='text-xl'/>}
                                         content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                            </div>

                        </div>

                        <p className="text-xs text-base-300">{settings.formSettings.repeat.textAfter}</p>
                    </div>

                    <Button
                        className="rounded-lg"
                        size="xl"
                        variant="secondary"
                        disabled={isButtonDisabled}
                        onClick={handleDonate}
                        style = {{
                            backgroundColor: `${settings.formSettings.button.style.backColor}`,
                            color: `${settings.formSettings.button.style.color}`
                        }}
                    >
                        {settings.formSettings.button.text}
                    </Button>
                </div>
            </ContentPanel>
        </>
    );
};

Donation.propTypes = {
    groupId: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
}

export default Donation;