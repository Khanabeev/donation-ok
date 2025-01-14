import React, { useEffect, useState } from "react";
import { initFAPI, callApi } from "./utils/okSdk";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

const App = () => {
    const [role, setRole] = useState(null);
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        const appId = "512002738663";
        const appKey = "56A2AC5DC735A6B5D99602A7";

        initFAPI(appId, appKey, () => {
            console.log("FAPI инициализирован");

            // Определяем параметры запуска
            const params = window.FAPI.Util.getRequestParameters();
            setRole(params.viewer_type);
            setGroupId(params.group_id);
        }, (error) => {
            console.error("Ошибка инициализации FAPI:", error);
        });
    }, []);

    if (!role || !groupId) {
        return <div>Загрузка...</div>;
    }

    return role === "ADMIN" ? (
        <AdminPage groupId={groupId} />
    ) : (
        <UserPage groupId={groupId} />
    );
};

export default App;
