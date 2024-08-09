import e from 'express';
import userRouter from './user.routes.js';
import txRouter from './transaction.routes.js';

export const router = e.Router();

router.use('/users', userRouter);
router.use('/transactions', txRouter);
router.use('/auth');
