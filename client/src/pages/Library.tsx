import { useState } from "react";
import { Book } from "../utils/bookInterface.ts";
import "./css/Library.css";

const Library = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("savedUsers");

    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const removeBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const rows: JSX.Element[] = [];
  books.forEach((book, index) => {
    rows.push(
      <tr>
        <td>{book.bookId}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.isbn}</td>
        <td>
          <button id="remove-book" onClick={() => removeBook(index)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div id="library-container">
      <h1>Library</h1>

      <main>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </main>
    </div>
  );
};

export default Library;
