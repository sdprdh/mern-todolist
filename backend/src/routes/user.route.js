import express from 'express';
import {
    getUserController,
    loginController,
    logoutController,
    registerController,
} from '../controllers/user.controller.js';
import protectAuth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/user', protectAuth, getUserController);

export default router;
