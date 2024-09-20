import { useEffect, useState } from 'react'

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
  
  
    return (
      <div>
        <div className='search-results'>
          <div className='result-item'>
          {lists.length > 0 ? (
            <ul>
              {lists.map((list) => (
                <li key={list.list_name}> 
                  <h3>{list.list_name}</h3>
                  <ul>
                    {list.books.map((book) =>(
                        <li key={book.title}>
                            <h4>{book.author}</h4>
                            </li>

                    ))}
                  </ul>
                </li>
                
              ))}
            </ul>
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
      </div>
      
    );
  }
  
  export default BestSeller;
  