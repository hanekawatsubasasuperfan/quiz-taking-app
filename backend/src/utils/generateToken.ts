import jwt from 'jsonwebtoken';

export interface UserPayLoad{
    id: number;
    username: string;
}

export function generateToken(payload: UserPayLoad): string{
    const secret = process.env.JWT_SECRET_KEY;

    if(!secret){
        throw new Error("Secret key is missing!")
    }

    return jwt.sign(payload, secret,{
        "expiresIn": "1h",
    })
}