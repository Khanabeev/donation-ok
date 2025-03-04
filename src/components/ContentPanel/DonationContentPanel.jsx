import PropTypes from 'prop-types';
import cn from "classnames";

const ContentPanel = ({children, hasBackground = true}) => {

    const classes = cn("absolute top-[-40px] px-6  rounded-t-3xl pt-6 mx-[10px] sm:mx-[70px]", {
        "bg-white": hasBackground,
    })

    return (
        <div className="flex place-content-center relative bg-white h-[calc(100vh-100px)] sm:h-[calc(100vh-400px)]">
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