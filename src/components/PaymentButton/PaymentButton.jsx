import PropTypes from 'prop-types';
import Button from "@/components/Button/Button.jsx";
import cn from "classnames";

const PaymentButton = ({isDisabled, text, colors, ...props}) => {

    return (
        <Button
            style={{
                backgroundColor: isDisabled ? "" : colors.primary,
                color: colors.textColor,
            }}
            className={cn("rounded-lg")}
            size="xl"
            variant="secondary"
            disabled={isDisabled}
            {...props}
        >
            {text}
        </Button>
    );
};

PaymentButton.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    colors: PropTypes.object.isRequired,
};

export default PaymentButton;