import express from 'express';
import {
  loginUser,
  registerUser,
  updateUser,
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users/:id - Get a user by id
router.post('/login', loginUser);

// POST /users - Create a new user
router.post('/', registerUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);


export { router as userRouter };
