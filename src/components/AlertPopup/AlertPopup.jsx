import React from "react";
import PropTypes from "prop-types";
import Button from "@/components/Button/Button.jsx";

const AlertPopup = ({title, message, onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end">
                    <Button
                        variant="primary"
                        onClick={onClose}
                    >
                        ОК
                    </Button>
                </div>
            </div>
        </div>
    );
};

AlertPopup.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default AlertPopup;
