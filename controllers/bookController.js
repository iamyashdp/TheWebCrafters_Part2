const Book = require('../models/book');

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
// Get a single book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
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

// Delete a book
exports.deleteBook = async (req, res) => {
    res.status(501).json({ message: 'Not implemented' });
};
