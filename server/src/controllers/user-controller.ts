import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/index.js";
import secrets from "../config/secrets.js";

// POST /Users/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, secrets.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }

  return;
};

// POST /Users
export const registerUser = async (req: Request, res: Response) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Create a new user instance
    const newUser = await User.create({ username, password });

    // Hash the password before saving
    // await newUser.setPassword(password);

    // Save the new user to the database
    // await newUser.save();
console.log(newUser);
    // Respond with the newly created user (excluding the password)
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error registering user:', error);

    // Respond with a generic error message
    res.status(500).json({ message: "Internal server error." });
  }
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
