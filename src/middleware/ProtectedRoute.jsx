import {Navigate, Outlet} from "react-router";
import PropTypes from "prop-types";

const ProtectedRoute = ({isAdminOfGroup, adminOnly, isGroupRegistered}) => {

    // Если группа уже зарегистрированна и это админ
    if (isAdminOfGroup && isGroupRegistered) {
        return <Navigate to="/donate" replace/>;
    }

    // Если маршрут доступен только администраторам, но пользователь не администратор, перенаправляем
    if (adminOnly && !isAdminOfGroup) {
        return <Navigate to="/donate" replace/>;
    }

    // Если маршрут доступен всем, отображаем содержимое
    return <Outlet/>;
};

ProtectedRoute.propTypes = {
    isAdminOfGroup: PropTypes.bool,
    adminOnly: PropTypes.bool,
    isGroupRegistered: PropTypes.bool,
}

export default ProtectedRoute;
