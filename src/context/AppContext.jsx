import {createContext, useState, useEffect} from "react";
import {fetchIdentity} from "@/api/backend.js";
import bridge from "@vkontakte/vk-bridge";

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const [isAdminOfGroup, setIsAdminOfGroup] = useState(false);
    const [isGroupRegistered, setIsGroupRegistered] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [colorTheme, setColorTheme] = useState(null);

    useEffect(() => {
        async function init() {
            // Считываем параметры
            const params = new URLSearchParams(window.location.search);
            const groupRole = params.get("vk_viewer_group_role");
            const gid = params.get("vk_group_id");
            const uid = params.get("vk_user_id");

            setGroupId(gid);
            setUserId(uid);
            setIsAdminOfGroup(groupRole === "admin");

            // Асинхронные проверки
            try {
                // Если есть gid, проверяем регистрацию группы
                if (gid) {
                    await fetchIdentity(gid);
                    setIsGroupRegistered(true);
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setIsGroupRegistered(false);
            }

            // Получаем информацию о пользователе (если есть uid)
            if (uid) {
                try {
                    const res = await bridge.send('VKWebAppGetUserInfo', { user_id: uid });
                    setUserName(res.first_name + " " + res.last_name);
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    setUserName(null);
                }
            }

            // Все проверки завершены => убираем лоадер
            setIsLoading(false);
        }

        init();
    }, []);

    const value = {
        isAdminOfGroup,
        isGroupRegistered,
        groupId,
        userId,
        isLoading,
        setIsLoading,
        userName,
        colorTheme,
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
};
