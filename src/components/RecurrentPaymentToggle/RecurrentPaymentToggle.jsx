import PropTypes from 'prop-types';
import {FiCheckSquare} from "react-icons/fi";
import Popover from "@/components/Popover/Popover.jsx";
import {GoQuestion} from "react-icons/go";

const RecurrentPaymentToggle = ({text, textAfter}) => {
    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer text-base-300 transition duration-300"
                 onClick={() => console.log('tuggle')}>
                <div className="text-4xl">
                    <FiCheckSquare className="text-primary"/>
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
};

export default RecurrentPaymentToggle;