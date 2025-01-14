// models/product.js
const mongoose = require("mongoose");
const Joi = require("joi");

// Rating Schema
const ratingSchema = new mongoose.Schema({
  stars: { type: Number, required: true, min: 0, max: 50 }, // Ensure consistency
  count: { type: Number, required: true, min: 0 },
});

// Product Schema
const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  rating: { type: ratingSchema, required: true },
  priceCents: { type: Number, required: true, min: 0 },
  type: { type: String, default: "product", enum: ["product"] },
  keywords: { type: [String], default: [] },
  category: { type: String, required: true }, // New category field
});

// Mongoose Model
const Product = mongoose.model("Product", productSchema);

// Joi Validation Schema
function validateProduct(product) {
  const schema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    rating: Joi.object({
      stars: Joi.number().min(0).max(50).required(),
      count: Joi.number().min(0).required(),
    }).required(),
    priceCents: Joi.number().min(0).required(),
    type: Joi.string().valid("product").optional(),
    keywords: Joi.array().items(Joi.string()).optional(),
    category: Joi.string().required(),
  });

  return schema.validate(product);
}

// Exporting Mongoose Model and Validation Function
module.exports = {
  Product,
  validateProduct,
};
