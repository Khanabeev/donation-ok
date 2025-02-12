import React, {useEffect, useState} from "react";
import {initFAPI} from "./core/okSdk";
import {Route, Routes} from "react-router";
import Donation from "./pages/Donation/Donation.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import ProtectedRoute from "@/middleware/ProtectedRoute.jsx";
import SuccessPayment from "@/pages/SuccessPayment/SuccessPayment.jsx";
import {fetchIdentity} from "@/api/backend.js";
import {extractDonationSettings} from "@/utils/ProcessResponse.js";
import Loader from "@/components/Loader/Loader.jsx";

const App = () => {
    const [isAdminOfGroup, setIsAdminOfGroup] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [isGroupRegistered, setIsGroupRegistered] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState({});


    const checkGroupRegistration = async (gid) => {
        return await fetchIdentity(gid)
            .then(() => true)
            .catch(() => false);
    };

    // Загрузка параметров группы
    const loadSettings = async (groupId) => {
        setIsLoading(true);
        try {
            const data = await fetchIdentity(groupId);
            const processedData = extractDonationSettings(data);
            setSettings(processedData);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const onSuccess = () => {
        console.log("FAPI инициализирован");
        const params = new URLSearchParams(window.location.search);
        setIsAdminOfGroup(params.get("viewer_type") === "ADMIN");
        setGroupId(params.get("group_id"));
        setUserId(params.get("logged_user_id"))
        setUserName(params.get("user_name"))
        setIsLoading(false);

        checkGroupRegistration(params.get("group_id"))
            .then(isRegistered => {
                setIsGroupRegistered(isRegistered);
            });

        loadSettings(params.get("group_id"));
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
        return <Loader/>;
    }

    return (
        <Routes>
            {/* Доступ только администраторам */}
            <Route element={<ProtectedRoute
                isAdminOfGroup={isAdminOfGroup}
                adminOnly={true}
                isGroupRegistered={isGroupRegistered}/>}>

                <Route index path="/" element={<Welcome/>}/>
                <Route path="/settings" element={<Settings groupId={groupId}/>}/>

            </Route>

            {/* Доступ для всех */}
            <Route path="/donate" element={
                <Donation
                    settings={settings}
                    groupId={groupId}
                    userId={userId}
                    userName={userName}
                />
            }/>
            <Route path="/success" element={<SuccessPayment/>}/>
        </Routes>
    );
};

export default App;
