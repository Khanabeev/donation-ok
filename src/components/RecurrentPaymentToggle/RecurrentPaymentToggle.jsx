import PropTypes from 'prop-types';
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";
import React, {useEffect, useState} from "react";

const RecurrentPaymentToggle = ({text, textAfter, settings, setValue, colors}) => {
    const [isChecked, setIsChecked] = useState(false);
    const repeatSettings = settings.formSettings.repeat;
    const variant = repeatSettings.variant || 0;

    useEffect(() => {
        setIsChecked(repeatSettings.default || false);
    }, []);

    const handleToggle = () => {
        setIsChecked(prev => !prev)
        setValue('is_recurrent', !isChecked)
    }

    return (

        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                 onClick={handleToggle}>
                <div className="text-4xl">
                    {isChecked ? (
                        <FiCheckSquare style={{color:colors.primary}}/>
                    ) : (
                        <FiSquare style={{color:colors.primary}}/>
                    )}

                </div>
                <span>{text}</span>

                <div>
                    <Popover trigger={<GoQuestion className='text-xl'/>}
                             content="Для управления периодическими пожертвованиями перейдите по ссылке в email"/>
                </div>

            </div>

            <p className="text-xs text-base-300">{textAfter}</p>
        </div>
    );
};

RecurrentPaymentToggle.propTypes = {
    text: PropTypes.string,
    textAfter: PropTypes.string,
    settings: PropTypes.object.isRequired,
    colors: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default RecurrentPaymentToggle;