const Book = require("../models/Book");
const asyncHandler = require("../utils/asyncHandler");

// @desc Create book
exports.createBook = asyncHandler(async (req, res) => {
  const book = await Book.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json(book);
});

// @desc Get all books
exports.getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// @desc Get book by id
exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

// @desc Update book
exports.updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  Object.assign(book, req.body);
  const updated = await book.save();
  res.json(updated);
});

// @desc Delete book
exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();
  res.json({ message: "Book deleted" });
});
