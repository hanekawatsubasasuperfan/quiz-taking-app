import {Router} from 'express'
import {signup} from '../controllers/authControllers.js'
import { validateRegister } from '../middleware/authValidation.js';

export const authRouter = Router();

authRouter.post('/signup', validateRegister, signup);


