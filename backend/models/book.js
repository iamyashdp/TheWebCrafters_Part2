const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  genre: { type: String, required: true },
  isbn: { type: String },
  borrowedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      borrowedDate: { type: Date, default: Date.now },
      returnDate: { type: Date },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);