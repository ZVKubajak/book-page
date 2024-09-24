import React, { useState, useEffect } from "react";
import './css/Favorites.css';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

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



  const removeFavorite = (index: number) => {
    const updatedFavorite = favorites.filter((_, i) => i !== index);
    localStorage.setItem("savedFavorite", JSON.stringify(updatedFavorite));
    setFavorites(updatedFavorite);
  };



  return (
    <div id="favorites" className="d-flex flex-column align-items-center">
      {/* <h2 className="mb-4">Favorites</h2> */}
  
      <h3 className="mb-3">Your Favorite Books</h3>
  
      {favorites.length === 0 ? (
        <p>No favorites added!</p>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Title</th>
              <th>Author</th>
              <th></th> {/* Column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {favorites.map((book, index) => (
              <tr key={`${book.id}-${index}`}>
                <td className="center">{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="center">
                  <Button
                    variant="danger"
                    onClick={() => removeFavorite(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
  
};

export default Favorites;



