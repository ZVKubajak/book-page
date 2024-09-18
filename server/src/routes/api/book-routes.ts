import express from 'express';
import { bookSearch } from '../../controllers/book-controller.js';

const router = express.Router();

router.get('/search', bookSearch )

export { router as BookRouter };


