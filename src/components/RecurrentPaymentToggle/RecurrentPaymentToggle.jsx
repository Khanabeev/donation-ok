import PropTypes from 'prop-types';
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";
import React, {useEffect, useState} from "react";
import cn from "classnames";
import {FaHeart, FaRegHeart} from "react-icons/fa";


const CustomRadio = ({ id, checked, onChange, label, colors }) => {
    return (
        <div className="flex items-center">
            <div className="relative flex items-center">
                {/* Скрытая стандартная радиокнопка для доступности */}
                <input
                    type="radio"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer" // Скрываем но оставляем доступной
                />
                {/* Кастомный внешний круг */}
                <div
                    style={{
                        borderWidth: "1px",
                        borderColor: checked ? colors.primary : '#d1d5db',
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center`}>

                    {/* Кастомный внутренний круг */}
                    <div
                        style={{
                            backgroundColor: checked ? colors.primary: 'transparent',
                        }}
                        className={`w-3 h-3 rounded-full`}></div>
                </div>
                <label htmlFor={id} className="ml-2 cursor-pointer">
                    {label}
                </label>
            </div>
        </div>
    );
};

const ToggleButton = ({ isSelected, onClick, label, colors, side }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                backgroundColor: isSelected ? colors.primary : 'transparent',
                color: isSelected ? 'white' : '',
            }}
            className={cn("px-4 py-2 h-14 w-full border border-base-200 transition-all duration-200 hover:opacity-90", {
                "rounded-l-lg border-r-0": side === 'left',
                "rounded-r-lg border-l-0": side === 'right',
            })}
        >
            {label}
        </button>
    );
};

const ToggleCheckbox = ({ isChecked, handleToggle, label, colors }) => {
    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                 onClick={handleToggle}>
                <div className="text-4xl">
                    {isChecked ? (
                        <FiCheckSquare style={{color: colors.primary}}/>
                    ) : (
                        <FiSquare style={{color: colors.primary}}/>
                    )}

                </div>
                <span>{label}</span>

                <div>
                    <Popover trigger={<GoQuestion className='text-xl'/>}
                             content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                </div>

            </div>
        </div>
    )
}

const HeartCheckbox = ({ isChecked, handleToggle, label, colors }) => {
    return (
        <div onClick={handleToggle}
             className="relative flex items-center gap-1 cursor-pointer rounded-full"
        >
            <div className={`
                transition-all duration-300 transform
                ${isChecked ? 'scale-110' : 'scale-100'}
            `}>
                {isChecked ? (

                    <div className="relative">
                        <div className="flex items-center justify-center rounded-full w-12 h-12"
                             style={{
                                 backgroundColor: colors.lightColor,
                                 color: colors.primary,
                             }}>
                            <FaHeart
                                className="text-xl hover:scale-110 transition-transform "
                            />
                        </div>

                        {/* Пульсирующий эффект */}
                        <div
                            className={`
                                absolute 
                                inset-0 
                                animate-ping 
                                opacity-75
                                rounded-full
                            `}
                        >
                            <div className="flex items-center justify-center rounded-full w-12 h-12"
                                 style={{
                                     backgroundColor: colors.lightColor,
                                     color: colors.primary,
                                 }}>
                                <FaHeart className="text-xl"/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center rounded-full bg-base-200 text-base-300 w-12 h-12">
                        <FaRegHeart
                            className="text-xl hover:scale-110 transition-transform "
                        />
                    </div>

                )}
            </div>
            <div className="relative">
                <div className="text-base-300">
                    {label}
                </div>
                <div className="absolute right-[-25px] top-[-10px] text-base-300">
                    <Popover trigger={<GoQuestion className='text-xl'/>}
                             content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                </div>
            </div>

        </div>
    );
}

const RecurrentPaymentToggle = ({settings, setValue, colors}) => {
    const [isChecked, setIsChecked] = useState(false);
    const repeatSettings = settings.formSettings.repeat;
    const variant = repeatSettings.variant || 0;

    useEffect(() => {
        setIsChecked(repeatSettings.default === 1 || false);
        setValue('is_recurrent', repeatSettings.default === 1 || false)
    }, []);

    const handleToggle = () => {
        setIsChecked(prev => !prev)
        setValue('is_recurrent', !isChecked)
    }

    const handleRadioChange = (value) => {
        const newValue = value === 'yes';
        setIsChecked(newValue);
        setValue('is_recurrent', newValue);
    }

    return (
        <div>
            {/* Radio buttons variant-0 */}
            {variant === 0 && (
                <div>
                    <div className="flex items-center justify-between gap-4 mb-4 text-base-300 transition duration-300">
                        <CustomRadio
                            id="no"
                            checked={!isChecked}
                            onChange={() => handleRadioChange('no')}
                            label={repeatSettings.textNo}
                            colors={colors}
                        />
                        <CustomRadio
                            id="yes"
                            checked={isChecked}
                            onChange={() => handleRadioChange('yes')}
                            label={repeatSettings.text}
                            colors={colors}
                        />
                    </div>
                    <p className="text-xs text-base-300">{repeatSettings.textAfter}</p>
                </div>
            )}

            {/* Checkbox variant-1 */}
            {variant === 1 && (
                <div>
                    <ToggleCheckbox
                        isChecked={isChecked}
                        handleToggle={handleToggle}
                        label={repeatSettings.text}
                        colors={colors}
                    />
                <p className="mt-2 text-xs text-base-300">{repeatSettings.textAfter}</p>
                </div>

            )}

            {/* Toggle buttons variant-2 */}
            {variant === 2 && (
                <div>
                    <div className="flex items-center justify-between gap-4 mb-4 text-base-300">
                        <div className="flex w-full">
                            <ToggleButton
                                isSelected={!isChecked}
                                onClick={() => handleRadioChange('no')}
                                label={repeatSettings.textNo}
                                colors={colors}
                                side="left"
                            />
                            <ToggleButton
                                isSelected={isChecked}
                                onClick={() => handleRadioChange('yes')}
                                label={repeatSettings.text}
                                colors={colors}
                                side="right"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-base-300">{repeatSettings.textAfter}</p>
                </div>
            )}

            {/* Heart variant-3 */}
            {variant === 3 && (
                <HeartCheckbox
                    isChecked={isChecked}
                    handleToggle={handleToggle}
                    label={repeatSettings.text}
                    colors={colors}
                />
            )}
        </div>

    )
};

RecurrentPaymentToggle.propTypes = {
    text: PropTypes.string,
    textNo: PropTypes.string,
    textAfter: PropTypes.string,
    settings: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default RecurrentPaymentToggle;