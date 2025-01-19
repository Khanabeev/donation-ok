import {useState} from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Input from "@/components/Input/Input.jsx";

const AmountSelector = ({amounts, onChange}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [customAmount, setCustomAmount] = useState("");

    const handleSelect = (index, amount) => {
        setSelectedIndex(index);
        setCustomAmount(""); // Сброс произвольной суммы
        onChange(amount);
    };

    const handleCustomAmount = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        setSelectedIndex(null); // Сброс выбора фиксированной суммы
        onChange(value);
    };

    return (
        <div className="flex flex-wrap gap-[0.8em] w-full">
            {amounts.map((amount, index) => (
                <div key={index} className="flex-1 basis-auto">
                    <input
                        id={`amount-${index}`}
                        className="hidden"
                        type="radio"
                        name="amount"
                        checked={selectedIndex === index}
                        onChange={() => handleSelect(index, amount)}
                    />
                    <label
                        htmlFor={`amount-${index}`}
                        className={cn(
                            "flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer border text-md whitespace-nowrap font-medium border-base-200 bg-base-100 text-base-300 transition duration-300",
                            {
                                "bg-secondary text-primary border-0": selectedIndex === index,
                            }
                        )}
                    >
                        <span>{amount} ₽</span>
                    </label>
                </div>
            ))}

                <Input
                    type="text"
                    name="custom_sum"
                    min="0"
                    placeholder="Другая сумма"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    className="text-center px-6 py-4 flex-1"
                />
        </div>
    );
};

AmountSelector.propTypes = {
    amounts: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default AmountSelector;
