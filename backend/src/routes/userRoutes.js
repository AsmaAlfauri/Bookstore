const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { hasPermission } = require("../middleware/permissionMiddleware");
const { getUsers, deleteUser } = require("../controllers/userController");

const router = express.Router();

// Admin-only routes
router.get("/", protect, hasPermission("MANAGE_USERS"), getUsers);
router.delete("/:id", protect, hasPermission("MANAGE_USERS"), deleteUser);

module.exports = router;
