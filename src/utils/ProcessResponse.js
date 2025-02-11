/**
 * @typedef {Object} User
 * @property {string} first_name - Имя пользователя.
 * @property {string} last_name - Фамилия пользователя.
 * @property {string} [email] - Email пользователя.
 * @property {string} [phone] - Телефон пользователя.
 */

/**
 * @typedef {Object} FieldSettings
 * @property {Object} sum - Настройки суммы.
 * @property {Object} repeat - Настройки повторного платежа.
 * @property {boolean} repeat.default - Дефолтное значения повторного платежа.
 * @property {number} repeat.variant - Вариант отображения
 * @property {Object} payType - Настройки методов оплаты.
 * @property {Object} payType.default - Дефолтный метод оплаты.
 * @property {string} btnText - Текст кнопки.
 * @property {Object} btnStyle - Стили кнопки.
 */

/**
 * @typedef {Object} FundForm
 * @property {Object} data - Данные формы.
 * @property {string} data.urlOffer - Условия офферты.
 * @property {string} data.urlPersonalData - Условия обработки персональных данных.
 * @property {FieldSettings} data.fields - Поля формы.
 * @property {Object} clientData - Данные клиента.
 * @property {Object} clientData.company - Данные компании.
 * @property {string} clientData.company.title - Название компании.
 * @property {Object} clientData.project.paymentMethods - Массив с данными по методам оплаты.
 * @property {Object} clientData.project.operators - Операторы оплаты (СПБ(id=62), SberPay(id=20) и т.д.).
 */

/**
 * @typedef {Object} DonationData
 * @property {string} header - Описание фонда.
 * @property {string} fund_name - Название фонда.
 * @property {string} fund_logo - URL логотипа фонда.
 * @property {string} landing_url - URL лендинга фонда.
 * @property {FundForm} fund_form - Настройки формы.
 * @property {string} [target_title] - Название цели.
 * @property {number} [target_sum] - Сумма цели.
 * @property {string} [target_finish_date] - Дата завершения цели.
 * @property {number} [target_type] - Тип цели.
 * @property {User} user - Данные пользователя.
 */

/**
 * Извлекает настройки пожертвования.
 * @param {DonationData} data - Данные из бэка.
 * @returns {Object} - Обработанные настройки.
 */
export const extractDonationSettings = (data) => {
    const {
        header,
        fund_name,
        fund_logo,
        landing_url,
        fund_form,
        target_title,
        target_sum,
        target_finish_date,
        target_type,
    } = data;

    // Основная информация о фонде
    const generalInfo = {
        header,
        fundName: fund_name,
        fundLogo: fund_logo,
        landingUrl: landing_url,
    };

    // Настройки формы
    const formSettings = {
        sum: fund_form.data.fields.sum,
        repeat: fund_form.data.fields.repeat,
        payType: fund_form.data.fields.payType,
        button: {
            text: fund_form.data.btnText,
            style: fund_form.data.btnStyle,
        },
        email: fund_form.data.fields.email,
        comment: fund_form.data.fields.comment,
        terms:{
            urlOffer: fund_form.data.urlOffer,
            urlPersonalData: fund_form.data.urlPersonalData,
        }
    };

    // Информация о проекте
    const projectInfo = fund_form.clientData.project;

    // Информация о цели
    const targetInfo = {
        title: target_title,
        sum: target_sum,
        finishDate: target_finish_date,
        type: target_type,
    };

    // Данные пользователя
    const userInfo = {
        name: fund_form.clientData?.company.title,
    };

    return {
        generalInfo,
        formSettings,
        projectInfo,
        targetInfo,
        userInfo,
    };
};
