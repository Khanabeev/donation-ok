import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./Settings.module.css";
import Button from "@/components/Button/Button.jsx";
import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import AuthStorage from "@/utils/AuthStorage.js";
import {splitCode} from "@/utils/Code.js";
import {registerGroup} from "@/api/backend.js";
import AlertPopup from "@/components/AlertPopup/AlertPopup.jsx";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";

const Settings = ({groupId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const {clientId, token} = splitCode(code)
            await registerGroup(groupId, clientId, token)
            new AuthStorage().setToken(token);
            setSuccess("Поздравляем, приложение установленно!");
        } catch (error) {
            setError(error.message)
            setSuccess("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <HeaderPanel>
                <div className="flex gap-10 items-center">
                    <div className="text-7xl font-bold">
                        4385
                    </div>
                    <div className="text-lg">
                        некоммерческих организаций выбрали&nbsp;нас
                    </div>
                </div>
            </HeaderPanel>
            <ContentPanel>
                <p className="text-2xl font-bold mb-4">Приветствуем!</p>
                <p className="text-base-300">Мы — MIXPLAT, платежный сервис, который помогает собирать
                    пожертвования
                    для НКО России более 8 лет. Теперь наше решение есть и в Одноклассниках.</p>
                <p className="text-base-300">Если Вы уже работаете с нами, для активации приложения вставьте,
                    пожалуйста, код
                    из личного кабинета MIXPLAT тут:</p>
                <div className={styles.form}>
                    <div className={styles.textarea}>
                                <textarea
                                    rows={5}
                                    className={styles.input}
                                    placeholder="Введите ключ доступа"
                                    onChange={(el) => {
                                        setCode(el.target.value)
                                    }}
                                />
                    </div>
                    <div style={{paddingBottom: "14px"}}>
                        {code && code.length > 0 && (
                            <div className="text-center">
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    <span>Продолжить</span>
                                </Button>
                            </div>

                        )}
                    </div>
                </div>
                <p className={styles.desc}>
                    Если еще нет, пройдите, пожалуйста, простую регистрацию на нашем сайте.&nbsp;<a
                    className={styles.link} href="https://stat.mixplat.ru/donation/fundraising/vk/"
                    target={"_blank"}>Получить ключ
                    в ЛК Mixplat</a>
                </p>
            </ContentPanel>

            {error && (
                <AlertPopup message={error} onClose={() => setError("")} title="Ошибка"/>
            )}

            {success && (
                <AlertPopup message={success} onClose={() => setSuccess("")} title="Успешная авторизация"/>
            )

            }
        </>
    );
}
Settings.propTypes = {
    groupId: PropTypes.string,
}

export default Settings;
