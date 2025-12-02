import express from 'express'
import { getLoginedUser, login } from './../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = express.Router()

router.post('/login', login)
router.get('/load/user',auth, getLoginedUser)

export default router
