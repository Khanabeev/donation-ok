import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const RadioButtonToggle = (register, text, textNo, textAfter, defaultChecked) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(defaultChecked);
    }, [defaultChecked]);
    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300">
                <div>
                    <input type="radio" id="no" name="is_recurrent" {...register('is_recurrent')} value="no"/>
                    <label htmlFor="no">{textNo}</label>
                </div>
                <div>
                    <input type="radio" id="yes" name="is_recurrent" {...register('is_recurrent')} value="yes"/>
                    <label htmlFor="yes">{text}</label>
                </div>

            </div>

            <p className="text-xs text-base-300">{textAfter}</p>
        </div>
    );
};

RadioButtonToggle.propTypes = {
    text: PropTypes.string.isRequired,
    textNo: PropTypes.string.isRequired,
    textAfter: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
};

export default RadioButtonToggle;