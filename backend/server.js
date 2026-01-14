require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // body parser
app.use(helmet()); // security headers
app.use(mongoSanitize()); // sanitize data
app.use(xss()); // prevent XSS

// Logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/books", require("./src/routes/bookRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/payment", require("./src/routes/paymentRoutes"));

// Error middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
