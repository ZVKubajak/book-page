import { useState } from "react";
import "./css/Search.css";

// Define the Book type with bookId
interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
}

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!query) return console.log('No query found.');

    try {
      const response = await fetch(`/api/books/search?q=${query}`);
      const data: Book[] = await response.json();
      localStorage.setItem("books", JSON.stringify(data));
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = (book: Book) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    const updatedBooks = [...savedBooks, book]
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
    console.log(`${book.title} by ${book.author} was added to saved books!`);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchBooks} className="btn btn-primary">
            Search
          </button>
        </form>
        <div className="search-results">
          <div className="result-item">
            {books.length > 0 ? (
              <ul>
                {books.map((book) => (
                  <li key={book.bookId}>
                    {" "}
                    {/* Use bookId as the key */}
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p>{book.isbn}</p>
                    <button
                    onClick={() => addBook(book)}
                    className='btn btn-success'
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
