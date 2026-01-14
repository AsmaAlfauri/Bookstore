const Order = require("../models/Order");
const Book = require("../models/Book");

// @desc    Create new order
// @route   POST /api/orders
// @access  Authenticated user
exports.createOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let totalPrice = 0;
    const items = [];

    for (const item of orderItems) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      if (book.stock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${book.title}` });
      }

      // reduce stock
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "PAID") {
      order.isPaid = true;
      order.paidAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
