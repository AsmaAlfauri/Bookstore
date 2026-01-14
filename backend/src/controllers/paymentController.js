const asyncHandler = require("../utils/asyncHandler");

// @desc Mock payment processing
// @route POST /api/payment
// @access Private
exports.processPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod } = req.body;

  // فقط Simulation
  res.json({
    status: "success",
    orderId,
    paymentMethod,
    paidAt: new Date(),
    message: "Payment processed (mock)",
  });
});
