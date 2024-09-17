import { Router } from 'express';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/api/login', apiRoutes);
// The login route should not use authentication because users need to log in to be authenticated.

router.use('/api/', authenticateToken, apiRoutes);

export default router;
