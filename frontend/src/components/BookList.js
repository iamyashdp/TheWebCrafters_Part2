import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';
import BorrowBook from './BorrowBook'; // Import the BorrowBook component

const BookList = ({ books, setBooks }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authenticated. Please log in.');
        return;
      }

      const confirmDelete = window.confirm('Are you sure you want to delete this book?');
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(books.filter((book) => book._id !== id));
      alert('Book deleted successfully!');
    } catch (err) {
      console.error('Error deleting book:', err);
      alert(err.response?.data?.message || 'Failed to delete book.');
    }
  };

  const handleBorrow = (bookId) => {
    setBooks(books.map((book) => 
      book._id === bookId ? { ...book, availableQuantity: book.availableQuantity - 1 } : book
    ));
  };

  return (
    <div className="book-list">
      <h2>Available Books</h2>
      <ul className="book-grid">
        {books.map((book) => (
          <li key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
            <p>Genre: {book.genre}</p>
            <p>Available Quantity: {book.availableQuantity}</p>
            <div className="book-item-buttons">
              <Link to={`/editbook/${book._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
              {book.availableQuantity > 0 ? (
                <BorrowBook bookId={book._id} onBorrow={handleBorrow} />
              ) : (
                <p>Not Available</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
