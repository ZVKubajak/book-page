import { BookAttributes } from '../models/book.js';

interface GoogleBookVolume {
    volumeInfo: {
      title: string;
      authors?: string[];
      industryIdentifiers?: { type: string; identifier: string }[];
    };
  }
  
 function formatBookData(googleBook: GoogleBookVolume): Omit<BookAttributes, 'bookId'> {
    // console.log(googleBook);
    const title = googleBook.volumeInfo.title || 'Unknown Title';
    
    // Join authors if there's more than one, otherwise default to 'Unknown Author'
    const author = googleBook.volumeInfo.authors?.join(', ') || 'Unknown Author';
    
    // Extract ISBN-13 or ISBN-10
    const isbnInfo = googleBook.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13') 
                    || googleBook.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10');
    const isbn = isbnInfo ? isbnInfo.identifier : 'Unknown ISBN';
  
    return {
      title,
      author,
      isbn,
    };
  }
  
  export {GoogleBookVolume, formatBookData};