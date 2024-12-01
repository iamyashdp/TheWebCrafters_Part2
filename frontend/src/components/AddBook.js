import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    availableQuantity: '',
    isbn: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/books`,
        bookDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      alert('Book added successfully!');
      navigate('/'); 
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={bookDetails.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="number"
          name="publishedYear"
          value={bookDetails.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          required
        />
        <input
          type="text"
          name="genre"
          value={bookDetails.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="number"
          name="availableQuantity"
          value={bookDetails.availableQuantity}
          onChange={handleChange}
          placeholder="Available Quantity"
          required
        />
        <input
          type="text"
          name="isbn"
          value={bookDetails.isbn}
          onChange={handleChange}
          placeholder="ISBN (Optional)"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
