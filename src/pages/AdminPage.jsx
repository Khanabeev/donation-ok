import React, { useState } from "react";
import { callApi } from "../utils/okSdk";

const AdminPage = ({ groupId }) => {
    const [token, setToken] = useState("");

    const handleSaveToken = async () => {
        try {
            const result = await callApi("group.saveToken", { group_id: groupId, token });
            console.log("Токен сохранен:", result);
            alert("Токен успешно сохранен!");
        } catch (error) {
            console.error("Ошибка сохранения токена:", error);
            alert("Ошибка сохранения токена");
        }
    };

    return (
        <div>
            <h1>Настройки группы</h1>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Введите токен"
            />
            <button onClick={handleSaveToken}>Сохранить</button>
        </div>
    );
};

export default AdminPage;
