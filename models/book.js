const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  genre: { type: String, required: true },
  isbn: { type: String } // Remove unique and sparse options for now
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);