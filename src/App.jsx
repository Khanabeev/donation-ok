import React, {useEffect, useState} from "react";
import {initFAPI} from "./core/okSdk";
import {Route, Routes} from "react-router";
import Donation from "./pages/Donation/Donation.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import ProtectedRoute from "@/middleware/ProtectedRoute.jsx";

const App = () => {
    const [isAdminOfGroup, setIsAdminOfGroup] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const onSuccess = () => {
        console.log("FAPI инициализирован");
        const params = new URLSearchParams(window.location.search);
        setIsAdminOfGroup(params.get("viewer_type") === "ADMIN");
        setGroupId(params.get("group_id"));
        console.log(params.get("group_id"))

        setIsLoading(false);
    };

    const onError = (error) => {
        console.error("Ошибка инициализации FAPI:", error);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        initFAPI(onSuccess, onError);
    }, []);

    if (isLoading) {
        return <div style={{padding: "1rem"}}>Загрузка...</div>;
    }

    return (
        <Routes>
            {/* Доступ только администраторам */}
            <Route element={<ProtectedRoute isAdminOfGroup={isAdminOfGroup} adminOnly/>}>
                <Route index path="/" element={<Welcome />} />
                <Route path="/settings" element={<Settings groupId={groupId}/>}/>
            </Route>

            {/* Доступ для всех */}
            <Route path="/donate" element={<Donation/>}/>
        </Routes>
    );
};

export default App;
