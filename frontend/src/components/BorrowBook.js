import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    }


  };

  return (
    <button onClick={handleBorrow} className="borrow-button">
      Borrow
    </button>
  );
};

export default BorrowBook;
