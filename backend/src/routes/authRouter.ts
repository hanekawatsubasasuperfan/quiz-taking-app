import {Router} from 'express'
import {Signup, Login} from '../controllers/authControllers.js'
import { validateRegister,validateLogin } from '../middleware/authValidation.js';
import {authenticate} from '../middleware/authenticate.js'
import type {Response} from 'express';

export const authRouter = Router();

authRouter.post('/signup', validateRegister, Signup);
authRouter.post('/login', validateLogin, Login)
authRouter.get('/protected', authenticate, (_, res: Response)=>{
    console.log('nyan')
    return res.json({
        message: "success"
    });
})



