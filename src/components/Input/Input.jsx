import PropTypes from 'prop-types';
import cn from "classnames";

const Input = ({className, ...props}) => {
    const classes = cn("p-2 border rounded-lg outline-0 focus:outline-none text-base-300 focus:ring-2 focus:ring-secondary", className);
    return (
        <input
            {...props}
            className={classes}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
}

Input.propTypes = {};

export default Input;