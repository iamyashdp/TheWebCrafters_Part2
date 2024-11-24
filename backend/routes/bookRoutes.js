// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const protect = require('../middleware/auth');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/borrowed', protect, bookController.getBorrowedBooks);
router.get('/:id', bookController.getBook);

// Protected routes
router.post('/', protect, bookController.createBook);
router.put('/:id', protect, bookController.updateBook);
router.delete('/:id', protect, bookController.deleteBook);

// Borrow and return books
router.post('/borrow/:id', protect, bookController.borrowBook);
router.post('/return/:id', protect, bookController.returnBook);

// Get borrowed books


module.exports = router;