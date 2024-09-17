import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
import { User } from '../models/index.js';
import secrets from '../config/secrets.js';


// POST /Users/login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, secrets.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
      res.status(500).json({ error: 'Login failed' });
  }

  return;
};


// POST /Users
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username, password, and email are required.' });
  }

  try {
      const newUser = User.build({ username, password, email });
      await newUser.setPassword(password); // Hash the password before saving
      await newUser.save();
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ message: error });
  }
  return;
};

// PUT /Users/:id
// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
      const user = await User.findByPk(id);
      if (user) {
          if (username) user.username = username;
          if (password) {
              user.password = password;
              await user.setPassword(password); // Hash the new password
          }
          await user.save();
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(400).json({ message: error });
  }
};

