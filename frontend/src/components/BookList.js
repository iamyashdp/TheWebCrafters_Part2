// src/components/BookList.js
import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
            <p>Genre: {book.genre}</p>
            <p>Available Quantity: {book.availableQuantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;