// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';
import './Home.css'; 

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try{
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      }
      catch(err){
        console.error('Error fetching books:', err);
        alert(err.response?.data?.message || 'Failed to fetch books. Please make sure backend server is running. Please go to ../backend and run `node app` command to run ');
      }
      
    };

    fetchBooks();
  }, []);

  return (
    <div className='home'>
      <h1>Welcome to the Library</h1>
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
};

export default Home;