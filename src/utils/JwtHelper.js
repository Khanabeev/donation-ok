import {SignJWT} from "jose";

export const generateToken = async (payload, secretKey) => {
    const secret = new TextEncoder().encode(secretKey);
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);
};
