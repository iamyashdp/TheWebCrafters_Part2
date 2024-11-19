import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books, setBooks }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      if (!token) {
        alert('You are not authenticated. Please log in.');
        return;
      }

      const confirmDelete = window.confirm('Are you sure you want to delete this book?');
      if (!confirmDelete) return;

      // Send DELETE request to the backend
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the book list after deletion
      setBooks(books.filter((book) => book._id !== id));
      alert('Book deleted successfully!');
    } catch (err) {
      console.error('Error deleting book:', err);
      alert(err.response?.data?.message || 'Failed to delete book.');
    }
  };

  return (
    <div>
      <h2>Available Books</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
            <p>Genre: {book.genre}</p>
            <p>Available Quantity: {book.availableQuantity}</p>
            <div>
              <Link to={`/editbook/${book._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;