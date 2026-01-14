const jwt = require("jsonwebtoken");
const User = require("../models/User");

// حماية routes: لازم تسجيل دخول
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // populate role for permission checks
      req.user = await User.findById(decoded.id)
        .select("-password")
        .populate("role");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

// Admin middleware (Optional, legacy)
exports.admin = (req, res, next) => {
  // Enterprise way: role populated
  if (req.user && req.user.role && req.user.role.name === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Admin access only");
  }
};
