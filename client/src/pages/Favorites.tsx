import React, { createContext, useState, useContext } from 'react';

interface Book {
    id: string;
    title: string;
    author: string;
}

interface FavoritesContextType {
    favoriteBooks: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: string) => void;
}
