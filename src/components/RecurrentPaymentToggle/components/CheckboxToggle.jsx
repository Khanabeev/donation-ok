import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";

const CheckboxToggle = (register, text, textAfter, defaultChecked) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(defaultChecked);
    }, [defaultChecked]);
    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                 onClick={() => setIsChecked(prev => !prev)}>
                <div className="text-4xl">
                    {isChecked ? (
                        <FiCheckSquare className="text-primary"/>
                    ) : (
                        <FiSquare className="text-primary"/>
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

CheckboxToggle.propTypes = {
    text: PropTypes.string.isRequired,
    textAfter: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
};

export default CheckboxToggle;