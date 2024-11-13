const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);

// Protected routes (require authentication)
router.post('/', authenticateUser, authorizeAdmin, bookController.createBook);
router.put('/:id', authenticateUser, authorizeAdmin, bookController.updateBook);
router.delete('/:id', authenticateUser, authorizeAdmin, bookController.deleteBook);

module.exports = router;