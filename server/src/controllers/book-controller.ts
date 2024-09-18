import { Request, Response} from 'express';



const API_KEY = 'API_KEY';

// Route to search for books
export const bookSearch = async (req: Request, res: Response) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }

  try {
    // Fetching data from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    const data = await response.json();
console.log(data);
    // Sending the data back to the frontend
    return res.json(data.items || []);  
  } catch (error) {
   return res.status(500).json({ error: 'Failed to fetch books' });
  }
};
