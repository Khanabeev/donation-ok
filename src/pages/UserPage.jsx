import React, { useState } from "react";
import { showPayment } from "../utils/okSdk";

const UserPage = ({ groupId }) => {
    const [amount, setAmount] = useState(100);

    const handleDonate = () => {
        showPayment("Пожертвование", amount, `donation-${groupId}`);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Поддержите группу</h1>
            <div className="flex gap-2 mb-4">
                {[100, 200, 300, 400, 500].map((amt) => (
                    <button
                        key={amt}
                        className={`px-4 py-2 rounded ${
                            amount === amt ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setAmount(amt)}
                    >
                        {amt} ₽
                    </button>
                ))}
            </div>
            <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Другая сумма"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleDonate}
            >
                Пожертвовать {amount} ₽
            </button>
        </div>
    );
};

export default UserPage;
