import dotenv from 'dotenv';
dotenv.config();

import { Secret } from 'jsonwebtoken';

// Ensure JWT_SECRET is defined
const JWT_SECRET: Secret = process.env.JWT_SECRET || '';

console.log('TEST', JWT_SECRET); 

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export default {
  JWT_SECRET,
};