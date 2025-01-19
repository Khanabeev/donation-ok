import {useState} from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const PaymentMethodSelector = ({methods, onChange}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelect = (index, method) => {
        setSelectedIndex(index);
        onChange(method.slug); // Возвращаем выбранный метод
    };

    return (
        <div className="flex flex-wrap gap-4 justify-between">
            {methods.map((method, index) => (
                <div key={index} className="flex-1">
                    <input
                        id={`method-${index}`}
                        className="hidden"
                        type="radio"
                        name="paymentMethod"
                        onChange={() => handleSelect(index, method)}
                    />
                    <label
                        htmlFor={`method-${index}`}
                        className={cn(
                            "flex flex-col gap-2 items-center px-6 py-4 rounded-lg cursor-pointer border border-base-200 text-md whitespace-nowrap font-medium  bg-base-100 text-base-300 transition duration-300",
                            {
                                "bg-secondary text-primary border-0": selectedIndex === index,
                            }
                        )}>
                        <div className="flex gap-3">
                            {method.payTypes.map((type, index) => (
                                <div key={index} className="h-3">
                                    <img src={`/img/logo/${type}.svg`} className="h-full"/>
                                </div>
                            ))}
                        </div>

                        <span>{method.name}</span>

                    </label>
                </div>
            ))}
        </div>
    );
};

PaymentMethodSelector.propTypes = {
    methods: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PaymentMethodSelector;
