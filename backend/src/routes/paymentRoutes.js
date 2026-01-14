const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { processPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/", protect, processPayment);

module.exports = router;
