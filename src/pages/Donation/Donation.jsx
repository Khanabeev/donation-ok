import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";
import AmountSelector from "@/components/AmountSelector/AmountSelector.jsx";
import PaymentMethodSelector from "@/components/PaymentMethodSelector/PaymentMethodSelector.jsx";
import PropTypes from "prop-types";
import {generateToken} from "@/utils/JwtHelper.js";
import EmailInput from "@/components/EmailInput/EmailInput.jsx";
import DonationHeader from "@/components/DonationHeader/DonationHeader.jsx";
import RecurrentPaymentToggle from "@/components/RecurrentPaymentToggle/RecurrentPaymentToggle.jsx";
import PaymentButton from "@/components/PaymentButton/PaymentButton.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchema} from "@/schemas/donation.js";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader.jsx";
import CommentInput from "@/components/CommentInput/CommentInput.jsx";
import AcceptTerms from "@/components/AcceptTerms/AcceptTerms.jsx";

const Donation = ({settings, userId, userName}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);


    const {min, max} = settings.formSettings.sum;
    const schema = createSchema({
        min,
        max
    })

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: null,
            custom_amount: null,
            email: "",
            comment: "",
            is_recurrent: false,
            payment_method: "card",
        }
    })

    useEffect(() => {
        setPaymentMethods(settings.formSettings?.payType?.default || ["card", "mir_pay"]);
    }, [])

    const onDonate = (values) => {

        const payload = {
            "uid": userId, // id пользователя
            "project_id": settings.projectInfo.id, //Идентификатор проекта пожертвования. Приходит с бэка
            "utm_source": "ok",  //Источник трафика (UTM-метка).
            "utm_medium": "social", //Тип трафика (UTM-метка).
            "target_id": null, //Идентификатор адресного сбора (если есть).
            "source_url": `https://ok.ru/app/${import.meta.env.VITE_APP_ID}#success`, //URL для перенаправления после успешного пожертвования.
            "name": userName,
            "email": values.email,
            "phone": "",
            "comment": values.comment,
            "sum": values.custom_amount || values.amount, // Выбранная сумма пожертвования
            "repeat": values.is_reccurent ? '1' : '0',
            "payment_method": values.payment_method, // Метод оплаты
        }

        generateToken(payload, 'vk').then((token) => {
            window.location.assign(settings.generalInfo.landingUrl + "?source=ok&jwt=" + token);
        });
    }

    if (!settings) {
        return (
            <Loader/>
        )
    }
        console.log(errors, getValues())
    return (
        <>

            <HeaderPanel>
                <DonationHeader settings={settings}/>
            </HeaderPanel>
            <ContentPanel>
                <form onSubmit={handleSubmit(onDonate)}>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg text-base-300">Сумма пожертвования</p>

                        <AmountSelector
                            badges={settings.formSettings.sum.badges.map((item) => item.value ?? null) || []}
                            defaultBadge={settings.formSettings.sum.default || 10}
                            min={min}
                            max={max}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            setError={setError}
                            clearErrors={clearErrors}
                            watch={watch}
                        />

                        <EmailInput
                            register={register}
                            errors={errors}
                        />

                        <PaymentMethodSelector
                            availableMethods={paymentMethods}
                            register={register}
                            setValue={setValue}
                        />
                        <RecurrentPaymentToggle
                            text={settings.formSettings.repeat.text}
                            textAfter={settings.formSettings.repeat.textAfter}
                        />
                        <CommentInput
                            register={register}
                            errors={errors}
                            settings={settings}
                        />
                        <PaymentButton
                            type="submit"
                            style={{
                                backgroundColor: settings.formSettings.button.style.backColor,
                                color: settings.formSettings.button.style.color,
                            }}
                            text={settings.formSettings.button.text}
                        />
                        <AcceptTerms
                            register={register}
                            setValue={setValue}
                            settings={settings}
                        />
                    </div>
                </form>
            </ContentPanel>
        </>
    );
};

Donation.propTypes = {
    settings: PropTypes.object.isRequired,
    groupId: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
}

export default Donation;