import PropTypes from 'prop-types';
import cn from "classnames";

const DonationContentPanel = ({children, hasBackground = true}) => {

    const classes = cn("absolute top-[-40px] px-6  rounded-t-3xl pt-6 mx-[10px] sm:mx-[70px]", {
        "bg-white": hasBackground,
    })

    return (
        <div className="flex place-content-center relative bg-white h-[calc(100vh-100px)] md:h-[calc(100vh-400px)]">
            <div className={classes }>
                {children}
            </div>
        </div>
    );
};

DonationContentPanel.propTypes = {
    children: PropTypes.node.isRequired,
    hasBackground: PropTypes.bool,
};

export default DonationContentPanel;