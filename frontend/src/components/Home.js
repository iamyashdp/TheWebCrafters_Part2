// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';
import './Home.css'; 

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  return (
    <div className='home'>
      <h1>Welcome to the Book Store</h1>
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
};

export default Home;