const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: String,
      enum: [
        "CREATE_BOOK",
        "UPDATE_BOOK",
        "DELETE_BOOK",
        "VIEW_ORDERS",
        "MANAGE_USERS",
      ],
    },
  ],
});

module.exports = mongoose.model("Role", roleSchema);
