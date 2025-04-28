import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          // expires: 5 // 7 days in seconds (604800)
        },
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", CartSchema);
