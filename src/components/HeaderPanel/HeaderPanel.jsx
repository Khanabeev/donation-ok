import PropTypes from "prop-types";

import styles from "./HeaderPanel.module.css";


const HeaderPanel = ({children, colors = {}}) => {
    return (
        <div className={styles.wrapper__header}
        style={{
            backgroundColor: colors.primary,
            color: colors.textColor,
        }}>
            <div className="flex flex-col gap-4 mx-12">
                {children}
            </div>
        </div>
    );
};

HeaderPanel.propTypes = {
    children: PropTypes.node.isRequired,
    colors: PropTypes.object,
}

export default HeaderPanel;