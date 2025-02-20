import React, { useState } from "react";

const Popover = ({ trigger, content }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex place-content-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Триггер для отображения поповера */}
            <button>
                {trigger}
            </button>

            {/* Контент поповера */}
            {isHovered && (
                <div className="absolute mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-10">
                    <p className="text-gray-700 text-xs">{content}</p>
                </div>
            )}
        </div>
    );
};

export default Popover;
