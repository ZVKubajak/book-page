import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: number;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || '';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing. Authorization required.' });
  }

  // The token is usually in the form "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Add the decoded token data (user info) to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  return;
};
