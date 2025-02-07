import {useState} from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const PaymentMethodSelector = ({availableMethods, register}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const payment_type_card = 'card',
        payment_type_mobile = 'mobile',
        payment_type_mir = 'mir_pay',
        payment_type_yandex = 'yandex_pay',
        payment_type_sber_pay = 'sberpay',
        payment_type_sbp = 'sbp';

    let payment_methods = [
        {
            value: payment_type_card,
            recurrent: true,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/visa.svg"} alt={""}/>
                        <img className="h-full" src={"/img/logo/maestro.svg"} alt={""}/>
                        <img className="h-full" src={"/img/logo/mir.svg"} alt={""}/>
                    </div>
                    Банковская<br className="sm:hidden"/> карта
                </>
            )
        },
        {
            value: payment_type_sbp,
            recurrent: true,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/sbp_only.svg"} alt={""}/>
                    </div>

                    СБП <br className="sm:hidden"/> платёж
                </>
            )
        },
        {
            value: payment_type_sber_pay,
            recurrent: true,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/spay.svg"} alt={""}/>
                    </div>
                    Sber<br className="sm:hidden"/> Pay
                </>
            )
        },
        {
            value: payment_type_mobile,
            recurrent: false,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/beeline.svg"} alt={""}/>
                        <img className="h-full" src={"/img/logo/megafon.svg"} alt={""}/>
                        <img className="h-full" src={"/img/logo/mts.svg"} alt={""}/>
                        <img className="h-full" src={"/img/logo/yota.svg"} alt={""}/>
                    </div>

                    Мобильный<br className="sm:hidden"/> платёж
                </>
            )
        },
        {
            value: payment_type_yandex,
            recurrent: true,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/ya_pay.svg"} alt={""}/>
                    </div>

                    Yandex<br className="sm:hidden"/> Pay
                </>
            )
        },
        {
            value: payment_type_mir,
            recurrent: true,
            html: (
                <>
                    <div className="flex gap-1 h-3">
                        <img className="h-full" src={"/img/logo/mir.svg"} alt={""}/>
                    </div>
                    Mir<br className="sm:hidden"/> Pay
                </>
            )
        },
    ];

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };

    const generatePaymentLabel = (method, index) => {
        const paymentMethod = payment_methods.find(function (payment_type) {
            return payment_type.value === method;
        });
        if (paymentMethod) {
            return (<label
                htmlFor={`method-${index}`}
                className={cn(
                    "flex flex-col gap-2 items-center px-6 py-4 rounded-lg cursor-pointer border border-base-200 text-md whitespace-nowrap font-medium  bg-base-100 text-base-300 transition duration-300",
                    {
                        "bg-secondary text-primary border-0": selectedIndex === index,
                    }
                )}>
                {paymentMethod.html}
            </label>);
        }
    }

    return (
        <div className="flex flex-wrap gap-4 justify-between">
            {availableMethods.map((method, index) => (
                <div key={index} className="flex-1">
                    <input
                        {...register('payment_method')}
                        id={`method-${index}`}
                        className="hidden"
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        onChange={() => handleSelect(index)}
                    />
                    {generatePaymentLabel(method, index)}
                </div>
            ))}
        </div>
    );
};

PaymentMethodSelector.propTypes = {
    availableMethods: PropTypes.array.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default PaymentMethodSelector;
