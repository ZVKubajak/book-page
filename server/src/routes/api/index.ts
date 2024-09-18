import { Router } from 'express';
// import { userRouter } from './user-routes.js';
import { BookRouter } from './book-routes.js';

const router = Router();

// router.use('/users', userRouter);
router.use('/books', BookRouter);


export default router;
