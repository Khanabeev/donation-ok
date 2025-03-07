import { useRef, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './reset-slider-desktop.css'
import styles from './Desktop.module.css';
import {FaPlus} from "react-icons/fa";

const InstallDesktop = () => {
    let slider = useRef(null);
    const [currentSlide, updateCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => updateCurrentSlide(newIndex),
    };

    const slides = [
        'Удобный способ приема пожертвований и подписки на регулярную помощь для некоммерческих организаций',
        'Лёгкая настройка формы пожертвований в сообществе вашей НКО',
        'Возможность привязки к адресному сбору, чтобы получать целевые пожертвования',
        'Детальная статистика и аналитика платежей в личном кабинете НКО',
        'Прозрачная бухгалтерия. Все закрывающие документы в удобном виде'
    ];
    const images = [
        '/img/screens/d/1.png',
        '/img/screens/d/2.png',
        '/img/screens/d/3.png',
        '/img/screens/d/4.png',
        '/img/screens/d/5.png'
    ];

    return (
        <div className={styles.screen}>
            <div className="flex gap-8">
                <div className={`w-1/2 ${styles.slider}`}>
                    <Slider ref={(s) => (slider = s)} {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <div className={styles.sliderImage}>
                                    <img src={image} alt="" />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="w-1/2 mr-8">
                    <div className={`flex gap-1 ${styles.head}`}>
                        <div className={`w-1/4 ${styles.logo}`}>
                            <img src="/img/logo.png" alt="app" />
                        </div>
                        <div className="w-3/4">
                            <div className="flex flex-wrap gap-4">
                                <div className={`w-full ${styles.left}`}>
                                    <p className={styles.p}>приложение</p>
                                    <p className={`${styles.p} ${styles.appName} font-bold`}>
                                        «Пожертвование»
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`${styles.sliderDescription} ${
                                currentSlide === index ? styles.active : ''
                            }`}
                            onClick={() => {
                                if (slider) {
                                    slider.slickGoTo(index);
                                }
                            }}
                        >
                            <span>{slide}</span>
                        </div>
                    ))}

                    {/* Ещё один Row -> div */}
                    <div className="flex flex-wrap">
                        {/* Col span={24} -> w-full */}
                        <div className={`w-full ${styles.install}`}>
                            {/* Заменяем Button на обычную кнопку */}
                            <button
                                className={`${styles.button} flex items-center`}
                            >
                                <FaPlus className={styles.icon} />
                                <span>Установить</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallDesktop;
