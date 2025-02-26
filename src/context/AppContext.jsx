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

    useEffect(() => {
        // Считываем параметры один раз при монтировании
        const params = new URLSearchParams(window.location.search);
        params.forEach((param, key) => {
            console.log(key, '=', param);
        })
        const groupRole = params.get("vk_viewer_group_role");
        const gid = params.get("vk_group_id");
        const uid = params.get("vk_user_id");

        setGroupId(gid);
        setUserId(uid);
        setIsAdminOfGroup(groupRole === "admin");

        // Проверка регистрации
        async function checkGroup() {
            if (!gid) {
                setIsLoading(false);
                return;
            }
            try {
                await fetchIdentity(gid);
                setIsGroupRegistered(true);
            } catch (err) {
                setIsGroupRegistered(false);
            }
            setIsLoading(false);
        }

        async function getUserInfo(uid) {
            bridge.send('VKWebAppGetUserInfo', {
                user_id: uid
            })
                .then(res => {
                    setUserName(res.first_name + " " + res.last_name);
                })
                .catch(err => {
                    setUserName(null)
                })
            setIsLoading(false);
        }

        checkGroup();
        getUserInfo(uid);
    }, []);

    const value = {
        isAdminOfGroup,
        isGroupRegistered,
        groupId,
        userId,
        isLoading,
        setIsLoading,
        userName,
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
};
