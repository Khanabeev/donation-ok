import React, { useState } from "react";

const UserPage = ({ groupId }) => {
    const [amount, setAmount] = useState(100);

    const handleDonate = () => {
        window.FAPI.UI.showPayment(
            "Пожертвование",
            amount,
            `donation-${groupId}`,
            null,
            (status, result) => {
                if (status === "ok") {
                    console.log("Оплата успешна:", result);
                    alert("Спасибо за пожертвование!");
                } else {
                    console.error("Ошибка оплаты:", result);
                    alert("Ошибка оплаты");
                }
            }
        );
    };

    return (
        <div>
            <h1>Пожертвовать</h1>
            <select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
                <option value={100}>100 ₽</option>
                <option value={200}>200 ₽</option>
                <option value={300}>300 ₽</option>
                <option value={400}>400 ₽</option>
                <option value={500}>500 ₽</option>
            </select>
            <button onClick={handleDonate}>Пожертвовать</button>
        </div>
    );
};

export default UserPage;
