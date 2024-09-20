import { Request, Response} from 'express';
import dotenv from 'dotenv';
import { formatBookData, GoogleBookVolume } from '../utils/format-data.js';
dotenv.config();

const API_KEY = process.env.API_KEY;
const NYT_API_KEY = process.env.NYT_API_KEY;

// Type definition for review
// interface Review {
//   url: string;
//   title: string;
//   summary: string;
  // Add other fields based on the NYT review response


// Function to fetch the first review from New York Times
// const fetchFirstReview = async (isbn: string): Promise<Review | null> => {
//   const url = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=${NYT_API_KEY}`;
  
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//     return data.results && data.results.length > 0 ? data.results[0] : null;
//   } catch (error) {
//     console.error('Error fetching review:', error);
//     return null;
//   }
// };

export const bestSellerSearch = async (_req: Request, res: Response) => {
 
  try {
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${NYT_API_KEY}`);
    const data = await response.json();
    return res.send(data.results.lists);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch books or reviews' });
  }
}



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
       formattedBooks = formattedBooks.slice(0,3);
       return res.json(formattedBooks); 
    }
    // return res.json(data.items || []);  
  } catch (error) {
   return res.status(500).json({ error: 'Failed to fetch books' });
  }
};