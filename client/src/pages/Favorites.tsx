import React, { useState } from "react";
import './css/Favorites.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
  id: string;
  title: string;
  author: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const books = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
      }));
      setSearchResults(books);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (book: Book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites((prev) => [...prev, book]);
    }
  };

  const removeFavorite = (bookId: string) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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




