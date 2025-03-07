import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './reset-slider-mobile.css';
import styles from './Mobile.module.css';
import {FiPlus} from "react-icons/fi";

const InstallMobile = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slides = [
        {
            title:
                'Удобный способ приема пожертвований и подписки на регулярную помощь для некоммерческих организаций',
            image: '/img/screens/d/1.png',
        },
        {
            title: 'Лёгкая настройка формы пожертвований в сообществе вашей НКО',
            image: '/img/screens/d/2.png',
        },
        {
            title:
                'Возможность привязки к адресному сбору, чтобы получать целевые пожертвования',
            image: '/img/screens/d/3.png',
        },
        {
            title:
                'Детальная статистика и аналитика платежей в личном кабинете НКО',
            image: '/img/screens/d/4.png',
        },
        {
            title:
                'Прозрачная бухгалтерия. Все закрывающие документы в удобном виде',
            image: '/img/screens/d/5.png',
        },
    ];

    return (
        <div className={styles.screen}>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <div className={`flex flex-wrap ${styles.appHeader}`}>
                        <div className={`w-full ${styles.logo}`}>
                            <img src="/img/logo.png" alt="app" />
                        </div>
                        <div className={`w-full ${styles.center}`}>
                            <p className={`${styles.p} ${styles.app}`}>приложение</p>
                        </div>
                        <div className={`w-full ${styles.center}`}>
                            <p className={`${styles.p} ${styles.appName}`}>«Пожертвование»</p>
                        </div>
                    </div>
                </div>

                {/* Col span={24} className={styles.slider} => div.w-full + пользовательский класс */}
                <div className={`w-full ${styles.slider}`}>
                    <Slider {...settings}>
                        {slides.map((slide, index) => (
                            <div key={index}>
                                <div className={styles.sliderImage}>
                                    <img src={slide.image} alt="" />
                                </div>
                                <div className={styles.sliderDescription}>
                                    <span>{slide.title}</span>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="w-full">

                    <div className="flex flex-wrap">
                        <div className={`w-full ${styles.install}`}>
                            <button
                                className={`${styles.button} flex items-center`}
                            >
                                <FiPlus className={styles.icon} />
                                <span>Установить</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallMobile;
