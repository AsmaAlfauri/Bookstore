const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const Book = require("../models/Book");

// @desc Create new order
// @route POST /api/orders
exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  let totalPrice = 0;
  const items = [];

  for (const item of orderItems) {
    const book = await Book.findById(item.book);
    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }
    if (book.stock < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for ${book.title}`);
    }

    book.stock -= item.qty;
    await book.save();

    totalPrice += book.price * item.qty;

    items.push({
      book: book._id,
      title: book.title,
      price: book.price,
      qty: item.qty,
    });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems: items,
    totalPrice,
  });

  res.status(201).json(order);
});

// @desc Get logged in user's orders
// @route GET /api/orders/my
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc Get all orders (Admin)
// @route GET /api/orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

// @desc Update order status (Admin)
// @route PUT /api/orders/:id/status
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  if (status === "PAID") {
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});
