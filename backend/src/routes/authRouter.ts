import {Router} from 'express'
import {signup, login, dashboard, logout} from '../controllers/authControllers.js'
import { validateRegister,validateLogin  } from '../middleware/authValidation.js';
import {authenticate} from '../middleware/authenticate.js'

export const authRouter = Router();

authRouter.post('/signup', validateRegister, signup);
authRouter.post('/login', validateLogin, login)
authRouter.post("/logout", logout);
authRouter.get('/dashboard', authenticate, dashboard)



