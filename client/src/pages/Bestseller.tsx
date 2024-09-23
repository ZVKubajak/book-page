import { useEffect, useState } from 'react'
import './css/BestSeller.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface List {
    list_name: string;
    books: Bestsellerbook[];
  }
interface Bestsellerbook {
    author: string;
    book_image: string;
    amazon_product_url: string;
    description: string;
    title: string;
}

const BestSeller: React.FC = () => {
  
    const [lists, setList] = useState<List[]>([]);
    const [openList, setOpenList] = useState<{ [key: string]: boolean }>({}); // Track open lists

  
    const searchBooks = async () => {
    
      try {
        const response = await fetch(`/api/books/bestsellers`);
        const data: List[] = await response.json();
        console.log(data);
        // localStorage.setItem('books', JSON.stringify(data));
        setList(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    useEffect(() => {
         searchBooks();
      }, []);

  // Function to toggle list open/close
  const toggleList = (listName: string) => {
    setOpenList((prev) => ({
      ...prev,
      [listName]: !prev[listName], // Toggle the specific list's open state
    }));
  };
  
    return (
      <div>
        <h1 className="mb-5 mx-4">Best Sellers</h1>
        <div className='search-results'>
                {lists.length > 0 ? (
                    <ul className='folder-list'>
                        {lists.map((list) => (
                            <li key={list.list_name} className='folder-item'>
                                <h3 onClick={() => toggleList(list.list_name)} className="folder-title">
                                    {list.list_name}
                                    {openList[list.list_name] ? (
                                        <FaAngleUp className="folder-arrow" />
                                    ) : (
                                        <FaAngleDown className="folder-arrow" />
                                    )}
                                </h3>
                                {openList[list.list_name] && (
                                    <ul className="books-grid">
                                        {list.books.map((book) => (
                                            <li key={book.title} className="book-card">
                                                {/* Book Image */}
                                                <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer">
                                                    <img src={book.book_image} alt={book.title} className="book-image" />
                                                </a>

                                                {/* Book Title as a clickable link */}
                                                <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer">
                                                    <h4>{book.title}</h4>
                                                </a>

                                                {/* Author */}
                                                <p>Author: {book.author}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}

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
  
  export default BestSeller;
  