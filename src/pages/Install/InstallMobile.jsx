import Slider from "react-slick";
import "./reset-slider-mobile.css"; // Если у вас есть файл сброса/правок для слайдера
import bridge from "@vkontakte/vk-bridge";
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
                "Удобный способ приема пожертвований и подписки на регулярную помощь для некоммерческих организаций",
            image: "/img/screens/d/1.png",
        },
        {
            title: "Лёгкая настройка формы пожертвований в сообществе вашей НКО",
            image: "/img/screens/d/2.png",
        },
        {
            title:
                "Возможность привязки к адресному сбору, чтобы получать целевые пожертвования",
            image: "/img/screens/d/3.png",
        },
        {
            title:
                "Детальная статистика и аналитика платежей в личном кабинете НКО",
            image: "/img/screens/d/4.png",
        },
        {
            title:
                "Прозрачная бухгалтерия. Все закрывающие документы в удобном виде",
            image: "/img/screens/d/5.png",
        },
    ];

    const handleInstall = () => {
        bridge
            .send("VKWebAppAddToCommunity")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4 px-4">
            {/* Шапка приложения */}
            <div className="text-center mb-6">
                {/* Логотип */}
                <div className="w-full flex justify-center mb-3">
                    <img
                        src="/img/logo.png"
                        alt="app"
                        className="w-16 h-16 object-contain"
                    />
                </div>
                {/* Текст "приложение" */}
                <p className="text-sm font-[Manrope] text-black leading-none mb-2">
                    приложение
                </p>
                {/* Название "Пожертвование" */}
                <p className="text-lg font-bold font-[Manrope] text-black leading-none">
                    «Пожертвование»
                </p>
            </div>

            {/* Слайдер */}
            <div className="mb-4">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index}>
                            <div className="text-center mb-4">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="inline-block w-3/4 h-auto"
                                />
                            </div>
                            <div className="text-center mb-6 px-2">
                <span className="text-sm text-[#212121] font-[Manrope]">
                  {slide.title}
                </span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Кнопка "Установить" */}
            <div className="text-center">
                <button
                    onClick={handleInstall}
                    className="
            inline-flex items-center justify-center
            bg-gradient-to-r from-[#FFB607] to-[#FF9900]
            hover:bg-[#34B073]
            text-white font-[Manrope] text-lg
            rounded-[40px] h-[44px] w-full max-w-xs mx-auto
            transition-colors duration-300
          "
                >
                    <FiPlus className="mr-2" />
                    <span>Установить</span>
                </button>
            </div>
        </div>
    );
};

export default InstallMobile;
