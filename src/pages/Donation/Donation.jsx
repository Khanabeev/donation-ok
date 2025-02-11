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
            is_terms_accepted: true,
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

    console.log(getValues())
    return (
        <>

            <HeaderPanel>
                <DonationHeader settings={settings}/>
            </HeaderPanel>
            <ContentPanel>
                <form onSubmit={handleSubmit(onDonate)}>
                    <div className="flex flex-col gap-4">
                        {Object.entries(settings.formSettings)
                            .filter(([, value]) => value?.state > 0)  // только активные
                            .sort(([, a], [, b]) => a.order - b.order)  // сортировка по order
                            .map(([key]) => {
                                switch (key) {

                                    case 'sum':
                                        return (
                                            <div key={key}>
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
                                            </div>)

                                    case 'email':
                                        return (
                                            <div key={key}>
                                                <EmailInput
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>
                                        )
                                    case 'comment':
                                        return (
                                            <div key={key}>
                                                <CommentInput
                                                    register={register}
                                                    errors={errors}
                                                    settings={settings}
                                                />
                                            </div>
                                        )
                                    case 'payType':
                                        return (
                                            <div key={key}>
                                                <PaymentMethodSelector
                                                    availableMethods={paymentMethods}
                                                    register={register}
                                                    setValue={setValue}
                                                />
                                            </div>
                                        )
                                    case 'repeat':
                                        return (
                                            <div key={key}>
                                                <RecurrentPaymentToggle
                                                    text={settings.formSettings.repeat.text}
                                                    textAfter={settings.formSettings.repeat.textAfter}
                                                    settings={settings}
                                                    setValue={setValue}
                                                />
                                            </div>
                                        )
                                }
                            })}
                        <div className="flex flex-col gap-1">
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