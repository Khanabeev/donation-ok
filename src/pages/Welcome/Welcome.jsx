import React from 'react';
import styles from "./Welcome.module.css";
import {BiDonateHeart} from "react-icons/bi";
import {FiHeart, FiSettings, FiLink, FiCheckSquare, FiFileText} from "react-icons/fi";
import Button from "@/components/Button/Button.jsx";
import {useNavigate} from "react-router";
import HeaderPanel from "@/components/HeaderPanel/HeaderPanel.jsx";
import ContentPanel from "@/components/ContentPanel/ContentPanel.jsx";


const Welcome = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderPanel>
                <div className={styles.header__title}>
                    <BiDonateHeart/>
                    Пожертвования
                </div>
                <div>Помогут повысить активность внутри группы, увеличить охват и вовлечь новых пользователей</div>
            </HeaderPanel>

            <ContentPanel hasBackground={false}>
                <ul className={styles.list}>
                    <li className={styles.list__item}>
                        <FiHeart className={styles.list__item__icon}/>
                        <span className={styles.list__item__text}>Удобный способ приема пожертвований и подписки на регулярную помощь <br/> для <b>некоммерческих организаций</b></span>
                    </li>
                    <li className={styles.list__item}>
                        <FiSettings className={styles.list__item__icon}/>
                        <span className={styles.list__item__text}>Лёгкая настройка формы пожертвований в сообществе вашей НКО</span>
                    </li>
                    <li className={styles.list__item}>
                        <FiLink className={styles.list__item__icon}/>
                        <span className={styles.list__item__text}>Возможность привязки к <b>адресному сбору</b>, чтобы получать целевые пожертвования</span>
                    </li>
                    <li className={styles.list__item}>
                        <FiFileText className={styles.list__item__icon}/>
                        <span className={styles.list__item__text}>Детальная статистика и аналитика платежей в личном кабинете НКО</span>
                    </li>
                    <li className={styles.list__item}>
                        <FiCheckSquare className={styles.list__item__icon}/>
                        <span className={styles.list__item__text}><b>Прозрачная бухгалтерия</b>. Все закрывающие документы в удобном виде</span>
                    </li>
                </ul>

                <div className={styles.footer}>
                    <Button variant="primary" onClick={() => navigate("/settings")}>Настроить</Button>
                </div>
            </ContentPanel>
        </>
    );
};

export default Welcome;