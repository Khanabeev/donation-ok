import {Navigate, Outlet} from "react-router";
import PropTypes from "prop-types";
import {useContext} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import Loader from "@/components/Loader/Loader.jsx";

const ProtectedRoute = () => {

    const {isLoading, groupId, isGroupRegistered, isAdminOfGroup} = useContext(AppContext);

    if (isLoading) {
        return <Loader/>;
    }

    // Если это администратор и он уже зарегистрировал группу
    if (isAdminOfGroup && isGroupRegistered) {
        return <Navigate to="/donate" replace/>;
    }

    // Если пользователь не администратор и он открывает изнутри группы, перенаправляем
    if (!isAdminOfGroup && groupId) {
        return <Navigate to="/donate" replace/>;
    }

    // Если группа не зарегистрирована и открывает обычный пользователь, перенаправляем на страницу "not-registered"
    if (!isAdminOfGroup && !isGroupRegistered && groupId) {
        return <Navigate to="/not-registered" replace/>;
    }

    if (!groupId) {
        return <Navigate to="/install" replace/>;
    }

    // Если все проверки пройдены, отображаем содержимое защищенного маршрута
    return <Outlet/>;
};

ProtectedRoute.propTypes = {
    isAdminOfGroup: PropTypes.bool,
    isGroupRegistered: PropTypes.bool,
    isRunFromGroup: PropTypes.bool,

}

export default ProtectedRoute;