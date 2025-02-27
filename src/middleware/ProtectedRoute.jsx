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

    // Если это внутри группы и он уже зарегистрирована группа в МП
    if (groupId && isGroupRegistered) {
        return <Navigate to="/donate" replace/>;
    }

    // Если внутри группы и не администратор открывает не зарегистрированную
    if (groupId && !isAdminOfGroup && !isGroupRegistered ) {
        return <Navigate to="/not-registered" replace/>;
    }

    // Приложение открыто вне группы
    if (!groupId) {
        return <Navigate to="/install" replace/>;
    }

    // Если все проверки пройдены, отображается содержимое Welcome страницы для регистрации
    return <Outlet/>;
};

ProtectedRoute.propTypes = {
    isAdminOfGroup: PropTypes.bool,
    isGroupRegistered: PropTypes.bool,
    isRunFromGroup: PropTypes.bool,

}

export default ProtectedRoute;