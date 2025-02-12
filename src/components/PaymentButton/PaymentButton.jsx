import PropTypes from 'prop-types';
import Button from "@/components/Button/Button.jsx";

const PaymentButton = ({isDisabled, text, colors, watch, ...props}) => {

    return (
        <Button
            style={{
                backgroundColor: colors.primary,
                color: colors.textColor,
            }}
            className="rounded-lg"
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
    watch: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    colors: PropTypes.object.isRequired,
};

export default PaymentButton;