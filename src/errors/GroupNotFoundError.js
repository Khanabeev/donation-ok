class GroupNotFoundError extends Error {
    constructor(message = "Группа не найдена, зарегистрируйтесь") {
        super(message);
        this.name = "GroupNotFoundError";
    }
}

export default GroupNotFoundError;

