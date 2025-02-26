import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { fetchIdentity } from "@/api/backend.js";

const useAppLogic = () => {
    const [isAdminOfGroup, setIsAdminOfGroup] = useState(false);
    const [isGroupRegistered, setIsGroupRegistered] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [customArgs, setCustomArgs] = useState(null);
    const [isRunFromGroup, setIsRunFromGroup] = useState(false);
    const navigate = useNavigate();

    // Проверка регистрации группы
    const checkGroupRegistration = useCallback(async (gid) => {
        if (!gid) {
            return false;
        }

        try {
            await fetchIdentity(gid);
            setIsGroupRegistered(true);
            return true;
        } catch (error) {
            setIsGroupRegistered(false);
            return false;
        }
    }, []);

    // Основная логика при загрузке
    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);

            // Получаем параметры из URL
            const params = new URLSearchParams(window.location.search);
            const groupRole = params.get("vk_viewer_group_role");
            const groupId = params.get("vk_group_id");
            const userId = params.get("vk_user_id");

            // Устанавливаем базовые состояния
            setGroupId(groupId);
            setUserId(userId);
            setIsRunFromGroup(!!groupId); // Преобразуем в булево значение

            if (!groupId) {
                navigate("/install");
                setIsLoading(false);
                return;
            }

            // Устанавливаем роль администратора
            const isAdmin = groupRole === "admin";
            setIsAdminOfGroup(isAdmin);

            // Проверяем регистрацию группы перед перенаправлением
            const isRegistered = await checkGroupRegistration(groupId);

            if (isAdmin && !isRegistered) {
                navigate(`/welcome?vk_group_id=${groupId}&vk_viewer_group_role=${groupRole}&vk_user_id=${userId}`);
                setIsLoading(false);
                return;
            }

            // Выполняем перенаправление в зависимости от роли и статуса регистрации
            if (isAdmin && isRegistered) {
                navigate(`/donate?vk_group_id=${groupId}&vk_viewer_group_role=${groupRole}&vk_user_id=${userId}`);
            } else if (!isAdmin && !isRegistered) {
                navigate(`/not-registered?vk_group_id=${groupId}&vk_viewer_group_role=${groupRole}&vk_user_id=${userId}`);
            } else if (!isAdmin && isRegistered) {
                navigate(`/donate?vk_group_id=${groupId}&vk_viewer_group_role=${groupRole}&vk_user_id=${userId}`);
            }

            setIsLoading(false);
        };

        loadInitialData();
    }, [navigate, checkGroupRegistration]);

    return {
        isLoading,
        isAdminOfGroup,
        groupId,
        isGroupRegistered,
        userId,
        customArgs,
        isRunFromGroup
    };
};

export default useAppLogic;