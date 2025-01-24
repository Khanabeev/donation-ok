import PropTypes from 'prop-types';
import Button from "@/components/Button/Button.jsx";

const PaymentButton = ({isDisabled, onClick, text, ...props}) => {
    return (
        <Button
            className="rounded-lg"
            size="xl"
            variant="secondary"
            disabled={isDisabled}
            onClick={onClick}
            {...props}
        >
            {text}
        </Button>
    );
};

PaymentButton.propTypes = {
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
};

export default PaymentButton;