import React from 'react';
import styles from './Button.module.css';

import PropTypes from 'prop-types';
import cn from "classnames";

const Button = ({children, variant, size, className, disabled, ...props}) => {

    const classes = cn("cursor-pointer py-2 px-4 outline-none border border-base-300 rounded-full whitespace-nowrap",
        className, {
            "text-base-100 bg-primary border-0 hover:bg-primary-dark": variant === 'primary',
            "text-primary bg-secondary border-0 hover:bg-secondary-dark": variant === 'secondary',
            "text-2xl py-6 px-4": size === 'xl',
            "disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-300": disabled,
        })
    return (
        <button className={classes} {...props} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

Button.propTypes = {};

export default Button;