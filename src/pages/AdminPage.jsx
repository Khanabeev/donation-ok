import React, { useState } from "react";
import { callApi } from "../utils/okSdk";

const AdminPage = ({ groupId }) => {
    const [token, setToken] = useState("");

    const handleSaveToken = async () => {
        try {
            await callApi("group.saveToken", { groupId, token });
            alert("Токен успешно сохранен!");
        } catch (error) {
            console.error("Ошибка сохранения токена:", error);
            alert("Не удалось сохранить токен.");
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Настройки группы</h1>
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Введите токен"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveToken}
            >
                Сохранить
            </button>
        </div>
    );
};

export default AdminPage;
