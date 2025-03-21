import {createContext, useState, useEffect} from "react";
import {fetchIdentity} from "@/api/backend.js";
import {initFAPI} from "@/core/okSdk.js";

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
        const init = async () => {
            console.log("FAPI инициализирован");
            // Считываем параметры
            const params = window.FAPI.Util.getRequestParameters();
            const groupRole = params.viewer_type;
            const gid = params.group_id;
            const uid = params.logged_user_id;
            const userName = params.user_name;
            const theme = params.theme;

            console.log(params)

            setGroupId(gid);
            setUserId(uid);
            setIsAdminOfGroup(groupRole === "ADMIN");
            setUserName(userName);
            setColorTheme(theme);

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

            // Все проверки завершены => убираем лоадер
            setIsLoading(false);
        }

        initFAPI(init(), () => {
            console.log('error')
        })
    }, [])

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
