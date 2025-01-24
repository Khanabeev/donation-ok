import PropTypes from 'prop-types';
import {FiCheckSquare, FiSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";

const RecurrentPaymentToggle = ({isRecurrent, onToggle, text, textAfter }) => {
    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                 onClick={() => onToggle()}>
                <div className="text-4xl">{isRecurrent ? (
                    <FiCheckSquare className="text-primary"/>
                ) : <FiSquare className="text-base-200"/>}
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
    isRecurrent: PropTypes.bool,
    text: PropTypes.string,
    textAfter: PropTypes.string,
    onToggle: PropTypes.func,
};

export default RecurrentPaymentToggle;