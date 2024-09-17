import { Router } from 'express';
import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// TODO: Add authentication to the API routes
// TODO we will only want to authenticate the routes for the home page (search, save books etc.)
// router.use(authenticateToken);
router.use('/api', apiRoutes);

export default router;
