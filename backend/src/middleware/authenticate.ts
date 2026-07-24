import type {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";


export function authenticate(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                status:'error',
                msg:'No token provided'
            })
        }
        
        try{
            const payload = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!
            )

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

