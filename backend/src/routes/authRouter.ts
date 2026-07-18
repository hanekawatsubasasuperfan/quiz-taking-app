import {Router} from 'express'
import {Signup, Login} from '../controllers/authControllers.js'
import { validateRegister,validateLogin } from '../middleware/authValidation.js';

export const authRouter = Router();

authRouter.post('/signup', validateRegister, Signup);
authRouter.post('/login', validateLogin, Login)



