import mongoose from "mongoose";

// Cart Item Schema
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be less than 0"], // Price validation to ensure it's a positive number
    },
  },
  { _id: false } // Disable generation of `_id` for cartItemSchema as it's embedded
);

// Cart Schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

// Create or use the existing Cart model
export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
