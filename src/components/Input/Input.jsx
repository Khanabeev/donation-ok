import PropTypes from 'prop-types';
import cn from "classnames";
import {forwardRef} from "react";

const Input = forwardRef(({className, ...props}, ref) => {
    const classes = cn("input w-full h-14 text-center p-2 border rounded-lg outline-0 focus:outline-none text-base-300 focus:ring-2 focus:ring-secondary", className);
    return (
        <input
            ref={ref}
            {...props}
            className={classes}
        />
    );
});

Input.propTypes = {
    className: PropTypes.string,
}

Input.displayName = "Input";

export default Input;