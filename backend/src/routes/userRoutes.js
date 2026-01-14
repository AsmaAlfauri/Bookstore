const express = require("express");
const { getUsers, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { hasPermission } = require("../middleware/permissionMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Admin-only
router.get("/", protect, hasPermission("MANAGE_USERS"), getUsers);
router.delete("/:id", protect, hasPermission("MANAGE_USERS"), deleteUser);

module.exports = router;
