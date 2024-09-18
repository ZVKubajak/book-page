import { useState } from 'react';

// Define the Book type with bookId
interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
}

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async () => {
    if (!query) return;

    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data: Book[] = await response.json();
      localStorage.setItem('books', JSON.stringify(data));
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>

      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.bookId}> {/* Use bookId as the key */}
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.isbn}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}

export default BookSearch;
