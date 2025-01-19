import PropTypes from "prop-types";

import styles from "./HeaderPanel.module.css";


const HeaderPanel = ({children}) => {
    return (
        <div className={styles.wrapper__header}>
            <div className={styles.header}>
                {children}
            </div>
        </div>
    );
};

HeaderPanel.propTypes = {
    children: PropTypes.node.isRequired,
}

export default HeaderPanel;