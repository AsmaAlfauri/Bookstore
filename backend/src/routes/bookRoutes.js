const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { hasPermission } = require("../middleware/permissionMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("../controllers/bookController");
const { createBookSchema } = require("../validators/bookValidator");

const router = express.Router();

// Public
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin
router.post("/", protect, hasPermission("CREATE_BOOK"), validate(createBookSchema), createBook);
router.put("/:id", protect, hasPermission("UPDATE_BOOK"), updateBook);
router.delete("/:id", protect, hasPermission("DELETE_BOOK"), deleteBook);

module.exports = router;
