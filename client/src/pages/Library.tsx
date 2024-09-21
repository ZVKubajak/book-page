import { useState } from "react";
import { Book } from "../utils/bookInterface.ts";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./css/Library.css";

const Library = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("savedUsers");

    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // TEST VALUES //

  /*
  const [books, setBooks] = useState<Book[]>([
    {
      bookId: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
    },
    {
      bookId: 2,
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
    },
    {
      bookId: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
    },
  ]);
  */

  const removeBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const rows: JSX.Element[] = [];
  books.forEach((book, index) => {
    rows.push(
      <tr>
        <td className="center">{book.bookId}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.isbn}</td>
        <td className="center">
          <Button variant="danger" onClick={() => removeBook(index)}>
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div id="library">
      <h1>Library</h1>

      <main>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </main>
    </div>
  );
};

export default Library;
