import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = ({ bookId, onReturn }) => {
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
      onReturn(bookId);  // Update the UI to reflect the return action
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
