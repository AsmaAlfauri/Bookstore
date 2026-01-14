const Joi = require("joi");

exports.createBookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0),
  description: Joi.string().allow(""),
  category: Joi.string().allow(""),
  image: Joi.string().uri().allow(""),
});
