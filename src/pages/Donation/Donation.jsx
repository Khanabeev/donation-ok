import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";
import AmountSelector from "@/components/AmountSelector/AmountSelector.jsx";
import PaymentMethodSelector from "@/components/PaymentMethodSelector/PaymentMethodSelector.jsx";
import PropTypes from "prop-types";
import {generateToken} from "@/utils/JwtHelper.js";
import {useDonationSettings} from "@/hooks/useDonationSettings.js";
import {useDonationValidation} from "@/hooks/useDonationValidation.js";
import EmailInput from "@/components/EmailInput/EmailInput.jsx";
import DonationHeader from "@/components/DonationHeader/DonationHeader.jsx";
import RecurrentPaymentToggle from "@/components/RecurrentPaymentToggle/RecurrentPaymentToggle.jsx";
import PaymentButton from "@/components/PaymentButton/PaymentButton.jsx";

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

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    }
    return (
        <>
            <HeaderPanel>
                <DonationHeader settings={settings}/>
            </HeaderPanel>
            <ContentPanel>
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-base-300">Сумма пожертвования</p>
                    <AmountSelector
                        amounts={settings.formSettings.sum.badges.map((item) => item.value ?? null)}
                        onChange={setSelectedAmount}
                        amountError={amountError}/>
                    <EmailInput
                        setEmail={setEmail}
                        error={emailError}
                    />
                    <PaymentMethodSelector
                        availableMethods={paymentMethods}
                        onChange={setSelectedPaymentMethod}/>
                    <RecurrentPaymentToggle
                        isRecurrent={isRecurrentPayment}
                        onToggle={toggleRecurrent}
                        text={settings.formSettings.repeat.text}
                        textAfter={settings.formSettings.repeat.textAfter}
                    />
                    <PaymentButton
                        isDisabled={isButtonDisabled}
                        onClick={() => handleDonate(userId, userName, settings)}
                        style={{
                            backgroundColor: settings.formSettings.button.style.backColor,
                            color: settings.formSettings.button.style.color,
                        }}
                        text={settings.formSettings.button.text}
                    />
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