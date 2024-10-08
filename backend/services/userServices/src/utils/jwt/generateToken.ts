import jwt from "jsonwebtoken"


interface TokenPayload {
    userId: string;

}

export const generateAccessToken = (userId: string) =>{
    const payload : TokenPayload = { userId}
    return jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET! , {expiresIn: "3m"});
};

export const generateRefreshToken = (userId: string) =>{
    const payload: TokenPayload = {userId};
    return jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET!, {expiresIn: "2d"})
}