import { Router } from 'express';

import { BookRouter } from './book-routes.js';

const router = Router();


router.use('/books', BookRouter);


export default router;
