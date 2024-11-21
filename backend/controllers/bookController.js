const Book = require('../models/Book');
const mongoose = require('mongoose');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, availableQuantity, genre, isbn } = req.body;

    if (!title || !author || !publishedYear || !availableQuantity || !genre) {
      return res.status(400).json({ message: "Title, author, publishedYear, availableQuantity, and genre are required" });
    }

    // If ISBN is provided, check if it already exists
    if (isbn) {
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ message: "A book with this ISBN already exists" });
      }
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(JSON.stringify(books, null, 2));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).send(JSON.stringify(book, null, 2));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear, availableQuantity, genre, isbn } = req.body;

    // Check if ISBN is being updated and if it already exists
    if (isbn) {
      const existingBook = await Book.findOne({ isbn, _id: { $ne: req.params.id } });
      if (existingBook) {
        return res.status(400).json({ message: "A book with this ISBN already exists" });
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedYear, availableQuantity, genre, isbn },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;  

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableQuantity <= 0) {
      return res.status(400).json({ message: 'Book is not available to borrow' });
    }

    book.borrowedBy.push({ userId, borrowedDate: new Date() });
    book.availableQuantity -= 1;
    await book.save(); 

    res.status(200).json({ message: `Book borrowed successfully "${book.title}"`, book });

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all borrowed books for the current user
exports.getBorrowedBooks = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the token
    const borrowedBooks = await Book.find({ 'borrowedBy.userId': userId });

    if (borrowedBooks.length === 0) {
      return res.status(404).json({ message: 'No books borrowed yet' });
    }

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { id } = req.params;  // Accessing bookId from the URL param
  const userId = req.user.id;  // Assuming you're using some kind of authentication middleware

  if (!id) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the book by its ID
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is borrowed by the current user
    const borrowedBook = book.borrowedBy.find(borrowed => borrowed.userId.toString() === userId);

    if (!borrowedBook) {
      return res.status(400).json({ message: "This book was not borrowed by the user" });
    }

    // Remove the user from the borrowed list
    book.borrowedBy = book.borrowedBy.filter(borrowed => borrowed.userId.toString() !== userId);

    // Increment the available quantity of the book
    book.availableQuantity += 1;

    await book.save();

    return res.status(200).json({ message: "Book returned successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
        { isbn: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};