import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    min: [0, "Price cannot be negative"],
  },
  images: [
    {
      type: String,
      required: [true, "Please provide at least one product image"],
    },
  ],
  category: {
    type: String,
    required: [true, "Please provide a product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: [0, "Stock cannot be negative"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
