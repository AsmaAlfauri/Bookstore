const mongoose = require("mongoose");
const Role = require("../models/Role");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const seedRoles = async () => {
  await Role.deleteMany();

  await Role.insertMany([
    {
      name: "user",
      permissions: [],
    },
{
  name: "admin",
  permissions: [
    "CREATE_BOOK",
    "UPDATE_BOOK",
    "DELETE_BOOK",
    "MANAGE_USERS",
    "VIEW_ORDERS",
  ],
}
  ]);

  console.log("Roles Seeded");
  process.exit();
};

seedRoles();
