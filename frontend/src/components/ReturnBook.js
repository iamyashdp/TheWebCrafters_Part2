import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReturnBook = ({ bookId, onReturn }) => {
  const navigate = useNavigate();

  const handleReturn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/books/return/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Book returned successfully!');
      onReturn(bookId);
      navigate('/');  
    } catch (err) {
      console.error('Error returning book:', err);
      alert('You must be logged in to return a book.');
    }
  };

  return (
    <button onClick={handleReturn} className="return-button">
      Return
    </button>
  );
};

export default ReturnBook;
