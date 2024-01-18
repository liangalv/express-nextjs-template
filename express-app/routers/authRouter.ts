import {Router}from 'express';
import authController from '../controllers/authController.js';
// import verifyToken from '../middleware/verifyToken.js';

const authRouter = Router();

authRouter.post('/login', authController.handleLogin);
authRouter.get('/token', authController.reissueAccessToken);
//protected routes
// authRouter.use(verifyToken);
authRouter.post('/logout', authController.handleLogout);

export default authRouter;
