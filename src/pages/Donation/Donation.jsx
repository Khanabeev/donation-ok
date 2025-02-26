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
import {useEffect, useState, useMemo, useContext} from "react";
import Loader from "@/components/Loader/Loader.jsx";
import CommentInput from "@/components/CommentInput/CommentInput.jsx";
import AcceptTerms from "@/components/AcceptTerms/AcceptTerms.jsx";
import parse from "color-parse";
import {fetchIdentity} from "@/api/backend.js";
import {extractDonationSettings} from "@/utils/ProcessResponse.js";
import {AppContext} from "@/context/AppContext.jsx";

const Donation = () => {
    const {
        isLoading,
        setIsLoading,
        groupId,
        userName,
        userId
    } = useContext(AppContext);


    const [paymentMethods, setPaymentMethods] = useState(["card"]);
    const [targetId, setTargetId] = useState(null);
    const [settings, setSettings] = useState(null);

    // Вычисляем цвета и другие производные данные только после загрузки settings
    const colors = useMemo(() => {
        if (!settings?.formSettings?.button?.style) {
            return {
                primary: null,
                textColor: null,
                lightColor: null
            };
        }

        const {backColor, color} = settings.formSettings.button.style;
        const parsedColor = parse(backColor || '');

        return {
            primary: backColor || null,
            textColor: color || null,
            lightColor: parsedColor?.values ?
                `rgba(${parsedColor.values[0]}, ${parsedColor.values[1]}, ${parsedColor.values[2]}, 0.1)` :
                null,
        };
    }, [settings]);

    // Создаем схему валидации только после загрузки settings
    const schema = useMemo(() => {
        if (!settings?.formSettings?.sum) {
            return createSchema({min: 0, max: 100000}); // дефолтные значения
        }
        const {min, max} = settings.formSettings.sum;
        return createSchema({min, max});
    }, [settings]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: {errors},
        reset
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
    });

    // Обработка параметров URL
    // useEffect(() => {
    //     if (customArgs) {
    //         const params = new URLSearchParams(customArgs);
    //
    //         if (params.has("target")) {
    //             setTargetId(params.get("target"));
    //         }
    //
    //         if (params.has("status")) {
    //             setIsSuccess(params.get("status") === 'success');
    //         }
    //     }
    // }, [customArgs]);

    // Загрузка настроек
    useEffect(() => {
        const loadSettings = async () => {
            if (!groupId) return;

            setIsLoading(true);
            try {
                const data = await fetchIdentity(groupId);
                const processedData = extractDonationSettings(data);
                setSettings(processedData);

                // Установка методов оплаты
                if (processedData?.projectInfo?.paymentMethods?.length > 0) {
                    setPaymentMethods(processedData.projectInfo.paymentMethods);
                }

                // Установка значений формы на основе полученных данных
                if (processedData?.formSettings?.sum?.default) {
                    setValue('amount', processedData.formSettings.sum.default);
                }
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, [groupId, setValue]);

    const isTermsAccepted = watch('is_terms_accepted');

    const onDonate = (values) => {
        if (!settings) return;

        const payload = {
            "uid": userId,
            "project_id": settings.projectInfo.id,
            "utm_source": "ok",
            "utm_medium": "social",
            "target_id": targetId ?? (-1 * settings.companyInfo.id),
            "source_url": `https://ok.ru/group/${groupId}/app/${import.meta.env.VITE_APP_ID}?status=success`,
            "name": userName,
            "email": values.email,
            "phone": "",
            "comment": values.comment,
            "sum": values.custom_amount || values.amount,
            "recurrent_payment": values.is_recurrent ? '1' : '0',
            "payment_method": values.payment_method,
            "user_fundraising_product": 'ok'
        };

        generateToken(payload, 'vk').then((token) => {
            window.location.assign(settings.generalInfo.landingUrl + "?source=ok&jwt=" + token);
        });
    };

    // Показываем загрузчик, пока данные не готовы
    if (isLoading || !settings) {
        return <Loader/>;
    }

    return (
        <>
            {/* Если нужен заголовок, раскомментируйте */}
            {/* <HeaderPanel colors={colors}>
                <DonationHeader settings={settings} />
            </HeaderPanel> */}

            <ContentPanel>
                <form onSubmit={handleSubmit(onDonate)}>
                    <div className="flex flex-col gap-4">
                        {settings && Object.entries(settings.formSettings)
                            .filter(([, value]) => value?.state > 0)
                            .sort(([, a], [, b]) => a.order - b.order)
                            .map(([key]) => {
                                switch (key) {
                                    case 'sum':
                                        return (
                                            <div key={key}>
                                                <p className="text-lg text-base-300">Сумма пожертвования</p>
                                                <AmountSelector
                                                    badges={settings.formSettings.sum.badges.map((item) => item.value ?? null) || []}
                                                    defaultBadge={settings.formSettings.sum.default || 10}
                                                    min={settings.formSettings.sum.min}
                                                    max={settings.formSettings.sum.max}
                                                    register={register}
                                                    errors={errors}
                                                    setValue={setValue}
                                                    setError={setError}
                                                    clearErrors={clearErrors}
                                                    watch={watch}
                                                    colors={colors}
                                                />
                                            </div>
                                        );

                                    case 'email':
                                        return (
                                            <div key={key}>
                                                <EmailInput
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>
                                        );

                                    case 'comment':
                                        return (
                                            <div key={key}>
                                                <CommentInput
                                                    register={register}
                                                    errors={errors}
                                                    settings={settings}
                                                />
                                            </div>
                                        );

                                    case 'repeat':
                                        return (
                                            <div key={key}>
                                                <RecurrentPaymentToggle
                                                    text={settings.formSettings.repeat.text}
                                                    textNo={settings.formSettings.repeat.textNo}
                                                    textAfter={settings.formSettings.repeat.textAfter}
                                                    textAfterRepeat={settings.formSettings.repeat.textAfterRepeat}
                                                    textAfterNoRepeat={settings.formSettings.repeat.textAfterNoRepeat}
                                                    settings={settings}
                                                    colors={colors}
                                                    setValue={setValue}
                                                    watch={watch}
                                                />
                                            </div>
                                        );

                                    default:
                                        return null;
                                }
                            })}

                        <div>
                            <PaymentMethodSelector
                                availableMethods={paymentMethods}
                                register={register}
                                setValue={setValue}
                                colors={colors}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <PaymentButton
                                type="submit"
                                colors={colors}
                                text={settings.formSettings.button.text}
                                isDisabled={!isTermsAccepted}
                            />

                            <AcceptTerms
                                register={register}
                                setValue={setValue}
                                settings={settings}
                                colors={colors}
                            />
                        </div>
                    </div>
                </form>
            </ContentPanel>
        </>
    );
};

Donation.propTypes = {
    groupId: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    customArgs: PropTypes.string,
};

export default Donation;