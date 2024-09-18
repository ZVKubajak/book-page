import { Router } from 'express';
import apiRoutes from './api/index.js';
import { loginUser, registerUser, updateUser } from '../controllers/user-controller.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// These routes are unprotected
router.post('/api/login', loginUser);
// POST - Create a new user
router.post('/api/register', registerUser);
// PUT - Update a user password by their id
router.put('/reset-password/:id', updateUser);
// The login route should not use authentication because users need to log in to be authenticated.

router.use('/api/', apiRoutes);

export default router;
