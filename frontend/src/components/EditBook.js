import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { bookId } = useParams(); 
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    availableQuantity: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/${bookId}`);
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to fetch book details.');
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
  
      await axios.put(
        `${process.env.REACT_APP_API_URL}/books/${bookId}`,
        book,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      alert('Book updated successfully!');
      navigate('/'); 
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please check your credentials and try again.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="number"
          name="publishedYear"
          value={book.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          required
        />
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="number"
          name="availableQuantity"
          value={book.availableQuantity}
          onChange={handleChange}
          placeholder="Available Quantity"
          required
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
