import React, { useState, useEffect } from "react";
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
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [searchResults, setSearchResults] = useState<Book[]>([]);

  // Function to fetch books from Google Books API
  useEffect(() => {
    const savedFavorite = JSON.parse(localStorage.getItem("savedFavorite") || "[]");
    setFavorites(savedFavorite);
  }, []);

  // Function to handle adding a book to favorites
  // const addFavorite = (book: Book) => {
  //   if (!favorites.some((fav) => fav.id === book.id)) {
  //     setFavorites((prev) => [...prev, book]);
  //   }
  // };

  // Function to handle removing a book from favorites
  // const removeFavorite = (bookId: string) => {
  //   setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  // };

  const removeFavorite = (index: number) => {
    const updatedFavorite = favorites.filter((_, i) => i !== index);
    localStorage.setItem("savedFavorite", JSON.stringify(updatedFavorite));
    setFavorites(updatedFavorite);
  };

  // Handle search input change
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  // Handle search submission
  // const handleSearchSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   fetchBooks(searchTerm);
  // };

  return (
    <div>
      <h2>Favorites</h2>
      
      {/* <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Search Results</h3> */}
      {/* <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => addFavorite(book)}>Add to Favorites</button>
          </li>
        ))}
      </ul> */}

      <h3>Your Favorites</h3>
      <ul>
  {favorites.length === 0 ? (
    <li>No favorites added!</li>
  ) : (
    favorites.map((book, index) => (
      <li key={`${book.id}-${index}`}>
        <strong>{book.title}</strong> by {book.author}
        <button onClick={() => removeFavorite(index)}>Remove</button>
      </li>
    ))
  )}
</ul>
    </div>
  );
};

export default Favorites;



