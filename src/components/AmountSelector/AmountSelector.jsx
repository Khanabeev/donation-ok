import {useEffect, useState} from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Input from "@/components/Input/Input.jsx";

const AmountSelector = ({register,min, max, badges, defaultBadge, setValue, errors, setError, clearErrors, colors}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [amounts, setAmounts] = useState([]);

    const handleSelect = (index, amount) => {
        setSelectedIndex(index);
        setValue("custom_amount", null);
        clearErrors("custom_amount");
        setValue("amount", amount);
    };

    // Устанавливаем дефолтную сумму пожертвования при инициализации
    useEffect(() => {
        setAmounts(badges);
        if (defaultBadge) {
            setValue("amount", defaultBadge);
            const badgesWithDefault = [...badges, defaultBadge];
            setAmounts(badgesWithDefault);
            setSelectedIndex(badgesWithDefault.length - 1);
        }
    }, []);

    const handleOnChangeCustomAmount = (e) => {
        const value = Number(e.target.value);

        setValue("amount", null);
        setSelectedIndex(null);

        setValue("custom_amount", value);

        if (value === 0) {
            clearErrors("custom_amount");
            setValue("custom_amount", null);
            if (defaultBadge) {
                setValue("amount", amounts[amounts.length - 1]);
                setSelectedIndex(amounts.length - 1);
                return;
            }
            setValue("amount", amounts[0]);
            setSelectedIndex(0);
            return;
        }

        // Данная валидация идет налету и стирается перед отправкой формы
        if (value < min) {
            setError("custom_amount", {
                type: "min",
                message: `Введите сумму от ${min} ₽`
            }, {shouldFocus: true})
            return;
        }

        if (value > max) {
            setError("custom_amount", {
                type: "max",
                message: `Введите сумму не больше ${max} ₽`
            }, {shouldFocus: true})
            setValue("custom_amount", max)
            return;
        }

        clearErrors("custom_amount");
    }

    return (
        <div className="flex flex-wrap gap-[0.8em] w-full">
            {amounts.map((amount, index) => (
                <div key={index} className="flex-1 basis-[calc(33.333%-0.8em)]">
                    <label
                        style={{
                            color: selectedIndex === index ? 'black' : '',
                            borderColor: selectedIndex === index ? colors.primary : '',
                            backgroundColor: selectedIndex === index ? colors.lightColor : '',
                        }}
                        className={cn(
                            "flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer border text-md whitespace-nowrap font-medium border-base-200 bg-base-100 text-base-300 transition duration-300",
                        )}
                    >
                        <Input
                            {...register("amount")}
                            className="hidden"
                            type="radio"
                            name="selected_amount"
                            onChange={() => handleSelect(index, amount)}
                        />

                        <span>{amount} ₽</span>
                    </label>
                </div>
            ))}
            <div className="relative flex-1 basis-full">
                <Input
                    {...register("custom_amount")}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Другая сумма"
                    onChange={(e) => handleOnChangeCustomAmount(e)}
                    className={cn(
                        {
                            "border-error": errors.custom_amount,
                        })}
                />
                {errors.custom_amount && (<div
                    className="text-sm text-white bg-error absolute top-[-10px] px-1">{errors.custom_amount.message}</div>)}
            </div>
        </div>
    );
};

AmountSelector.propTypes = {
    badges: PropTypes.array.isRequired,
    defaultBadge: PropTypes.number.isRequired,
    className: PropTypes.string,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
}

export default AmountSelector;
