const asyncHandler = require("../utils/asyncHandler");
const Book = require("../models/Book");

// @desc Get all books (pagination + search + filter)
// @route GET /api/books
exports.getBooks = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const categoryFilter = req.query.category ? { category: req.query.category } : {};
  const filter = { ...keyword, ...categoryFilter };

  const count = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({
    books,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc Get book by ID
// @route GET /api/books/:id
exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

// @desc Create book
// @route POST /api/books
exports.createBook = asyncHandler(async (req, res) => {
  const book = await Book.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(book);
});

// @desc Update book
// @route PUT /api/books/:id
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
// @route DELETE /api/books/:id
exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  await book.deleteOne();
  res.json({ message: "Book deleted" });
});
