import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReturnBook = ({ bookId, onReturn }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleReturn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      await axios.post(
        `http://localhost:5000/api/books/return/${bookId}`,
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
      setError(err.response?.data?.message || 'Failed to return book. Please try again.');
    }
  };

  return (
    <button onClick={handleReturn} className="return-button">
      Return
    </button>
  );
};

export default ReturnBook;
