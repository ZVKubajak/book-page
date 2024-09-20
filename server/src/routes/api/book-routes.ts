import express from 'express';
import { bookSearch, bestSellerSearch } from '../../controllers/book-controller.js';


const router = express.Router();

router.get('/search', bookSearch )
router.get('/bestsellers', bestSellerSearch)

export { router as BookRouter };


