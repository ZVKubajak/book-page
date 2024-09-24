import React, { useState } from "react";
import './css/Favorites.css';

// Type definition for a book
interface Book {
  id: string;
  title: string;
  author: string;
}

// Favorites component
const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch books from Google Books API
  const fetchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.items) {
        const books = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        }));
        setSearchResults(books);
      } else {
        setSearchResults([]); // No books found
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a book to favorites
  const addFavorite = (book: Book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites((prev) => [...prev, book]);
    }
  };

  // Function to handle removing a book from favorites
  const removeFavorite = (bookId: string) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  return (
    <div>
      <h2>Favorites</h2>
      
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <h3>Search Results</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => addFavorite(book)}>Add to Favorites</button>
          </li>
        ))}
      </ul>

      <h3>Your Favorites</h3>
      <ul>
        {favorites.length === 0 ? (
          <li>No favorites added!</li>
        ) : (
          favorites.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
              <button onClick={() => removeFavorite(book.id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Favorites;




