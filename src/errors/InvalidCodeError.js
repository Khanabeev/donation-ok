class InvalidCodeError extends Error {
    constructor(message = "Вы ввели неправильный код") {
        super(message);
        this.name = "InvalidCodeError";
    }
}

export default InvalidCodeError;
