import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";

const ContentPanel = ({children, hasBackground = true}) => {

    const classes = cn("absolute top-[-40px] px-6", {
        "bg-white rounded-t-3xl pt-6": hasBackground,
    })

    return (
        <div className="flex place-content-center relative">
            <div className={classes }>
                {children}
            </div>
        </div>
    );
};

ContentPanel.propTypes = {
    children: PropTypes.node.isRequired,
    hasBackground: PropTypes.bool,
};

export default ContentPanel;