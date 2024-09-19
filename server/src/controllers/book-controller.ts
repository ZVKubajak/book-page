import { Request, Response} from 'express';
import dotenv from 'dotenv';
import { formatBookData, GoogleBookVolume } from '../utils/format-data.js';
dotenv.config();

const API_KEY = process.env.API_KEY;

// Route to search for books
export const bookSearch = async (req: Request, res: Response) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }

let formattedBooks = []; 
// let formattedReviews = [];
  try {
    console.log(API_KEY);
    // Fetching data from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    const data = await response.json();
console.log(data);
    // Sending the data back to the frontend
    if (data.items) {
      // Format the book data to match your Sequelize model
       formattedBooks = await data.items.map((item: GoogleBookVolume) => formatBookData(item));
       return res.json(formattedBooks); 
    }
    // return res.json(data.items || []);  
  } catch (error) {
   return res.status(500).json({ error: 'Failed to fetch books' });
  }
};
