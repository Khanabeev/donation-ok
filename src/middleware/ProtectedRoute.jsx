import React from "react";
import {Navigate, Outlet} from "react-router";

const ProtectedRoute = ({ isAdminOfGroup, adminOnly }) => {
    // Если маршрут доступен только администраторам, но пользователь не администратор, перенаправляем
    if (adminOnly && !isAdminOfGroup) {
        return <Navigate to="/donate" replace />;
    }

    // Если маршрут доступен всем, отображаем содержимое
    return <Outlet/>;
};

export default ProtectedRoute;
