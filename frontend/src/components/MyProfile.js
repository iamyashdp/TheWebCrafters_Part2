import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReturnBook from './ReturnBook'; // Import the ReturnBook component

const MyProfile = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found. Please log in.');
        }

        const response = await axios.get('http://localhost:5000/api/books/borrowed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBorrowedBooks(response.data); 
      } catch (err) {
        console.error('Failed to fetch borrowed books:', err);
        setError('You have not borrowed any books yet.');
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleReturn = (bookId) => {
    // Logic for returning the book
  };

  return (
    <div className="my-profile">
      <h2>My Borrowed Books</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Borrowed on: {new Date(book.borrowedBy[0].borrowedDate).toLocaleDateString()}</p>
            <ReturnBook bookId={book._id} onReturn={handleReturn} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProfile;
