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
import {generateToken} from "@/utils/JwtHelper.js";
import {useDonationSettings} from "@/hooks/useDonationSettings.js";
import {useDonationValidation} from "@/hooks/useDonationValidation.js";

const Donation = ({groupId, userId, userName}) => {
    groupId = '70000033151402';

    const {
        settings,
        paymentMethods,
        isLoading
    } = useDonationSettings(groupId);

    const {
        email,
        setEmail,
        selectedAmount,
        setSelectedAmount,
        amountError,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        isRecurrentPayment,
        toggleRecurrent,
        emailError,
        paymentMethodError,
        isButtonDisabled,
    } = useDonationValidation(settings);

    const handleDonate = () => {
        const payload = {
            "uid": userId, // id пользователя
            "project_id": settings.projectInfo.id, //Идентификатор проекта пожертвования. Приходит с бэка
            "utm_source": "ok",  //Источник трафика (UTM-метка).
            "utm_medium": "social", //Тип трафика (UTM-метка).
            "target_id": null, //Идентификатор адресного сбора (если есть).
            "source_url": `https://ok.ru/app/${import.meta.env.VITE_APP_ID}#success`, //URL для перенаправления после успешного пожертвования.
            "name": userName,
            "email": email,
            "phone": "",
            "comment": "",
            "sum": selectedAmount, // Выбранная сумма пожертвования
            "repeat": isRecurrentPayment ? '1' : '0',
            "payment_method": selectedPaymentMethod, // Метод оплаты
        }
        generateToken(payload, 'vk').then((token) => {
            window.location.assign(settings.generalInfo.landingUrl + "?source=ok&jwt=" + token);
        });
    };

    if(isLoading) {
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

                    <PaymentMethodSelector availableMethods={paymentMethods} onChange={setSelectedPaymentMethod}/>
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