const asyncHandler = require("../utils/asyncHandler");

// @desc Process payment (mock)
// @route POST /api/payment
exports.processPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod } = req.body;

  res.json({
    status: "success",
    orderId,
    paymentMethod,
    paidAt: new Date(),
    message: "Payment processed (mock)",
  });
});
