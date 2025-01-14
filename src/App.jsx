import React, { useEffect, useState } from "react";
import { initSdk, callApi } from "./utils/okSdk";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

const App = () => {
    const [role, setRole] = useState(null);
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await initSdk();
                const groupData = await callApi("group.getCurrent");
                setRole(groupData.role);
                setGroupId(groupData.groupId);
            } catch (error) {
                console.error("Ошибка инициализации приложения:", error);
            }
        };

        initializeApp();
    }, []);

    if (!role || !groupId) {
        return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
    }

    return role === "ADMIN" ? (
        <AdminPage groupId={groupId} />
    ) : (
        <UserPage groupId={groupId} />
    );
};

export default App;
