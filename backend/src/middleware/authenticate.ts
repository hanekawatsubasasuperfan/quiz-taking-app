import type {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface UserPayload {
            id: number;
            username: string;
        }

        interface Request {
            user?: UserPayload;
        }
    }
}

export async function authenticate(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        const header = req.headers.authorization;
        if(!header){
            return res.status(401).json({
                status:'error',
                msg:'No token provided'
            })
        }

        const token = header.split(" ")[1];
        console.log(token);
        console.log(process.env.JWT_SECRET_KEY!)
        try{
            const payload = jwt.verify(
                token!,
                process.env.JWT_SECRET_KEY!
            )
            console.log(payload)
            console.log(payload.id!)
            console.log(payload.username!)
            if (
                typeof payload === "string" ||
                typeof payload.id !== "number" ||
                typeof payload.username !== "string"
                ) {
                return res.status(401).json({
                    status: "error",
                    msg: "Invalid token payload.",
                });
            }

            req.user = {
                    id: payload.id,
                    username: payload.username,
                };
            
            next();
        }catch(err){
            return res.status(401).json({
                status: "error",
                msg: "Invalid token.",
            });
        }
    }

