const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { hasPermission } = require("../middleware/permissionMiddleware");
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin
router.get("/", protect, hasPermission("VIEW_ORDERS"), getAllOrders);
router.put("/:id/status", protect, hasPermission("VIEW_ORDERS"), updateOrderStatus);

module.exports = router;
