const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// @desc Get all users (Admin)
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("role");
  res.json(users);
});

// @desc Delete user (Admin)
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.json({ message: "User deleted" });
});
