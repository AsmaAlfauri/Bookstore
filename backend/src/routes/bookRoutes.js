const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");
const { hasPermission } = require("../middleware/permissionMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { createBookSchema } = require("../validators/bookValidator");
const router = express.Router();

// Public
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin / Permissions
router.post(
  "/",
  protect,
  hasPermission("CREATE_BOOK"),
  createBook
);

router.put(
  "/:id",
  protect,
  hasPermission("UPDATE_BOOK"),
  updateBook
);

router.delete(
  "/:id",
  protect,
  hasPermission("DELETE_BOOK"),
  deleteBook
);
router.post(
  "/",
  protect,
  hasPermission("CREATE_BOOK"),
  validate(createBookSchema),
  createBook
);

module.exports = router;
