import InvalidCodeError from "@/errors/InvalidCodeError.js";

export const splitCode = (code) => {
    code = code.split(':');

    if (code.length < 2) {
        throw new InvalidCodeError();
    }

    return {
        clientId: code[0],
        token: code[1],
    }
}