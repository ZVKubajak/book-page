import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { formatBookData, GoogleBookVolume } from './format-data';
import { Request, Response} from 'express';
const router = express.Router();

const API_KEY = process.env.API_KEY;

// Route to search for books
export const searchAPI = async (req: Request, res: Response) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }

  try { 
    console.log(API_KEY);
    // Fetching data from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    const data = await response.json();
console.log(data);
    // Sending the data back to the frontend
    if (data.items) {
      // Format the book data to match your Sequelize model
      const formattedBooks = await data.items.map((item: GoogleBookVolume) => formatBookData(item));
      res.json(formattedBooks);  // Send formatted books to the frontend
    } else {
      res.json([]);  // Return an empty array if no items found
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};
router.get('/api/search', searchAPI);
export { router as BookRouter };

