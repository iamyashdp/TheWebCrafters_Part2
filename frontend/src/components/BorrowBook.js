import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BorrowBook = ({ bookId, onBorrow }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      await axios.post(
        `http://localhost:5000/api/books/borrow/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Book borrowed successfully!');
      onBorrow(bookId);  // Update the UI to reflect the borrow action
      navigate('/'); 
    } catch (err) {
      console.error('Error borrowing book:', err);
      setError(err.response?.data?.message || 'Failed to borrow book. Please try again.');
        alert('You must be logged in to borrow a book, and you can only borrow one copy of this book at a time.');

      
    }


  };

  return (
    <button onClick={handleBorrow} className="borrow-button" >
      Borrow
    </button>
  );
};

export default BorrowBook;
