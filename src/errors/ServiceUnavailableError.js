class ServiceUnavailableError extends Error {
    constructor(message = "Сервис временно недоступен. Свяжитесь с службой поддержки!") {
        super(message);
        this.name = "ServiceUnavailableError";
    }
}

export default ServiceUnavailableError;

