import express from "express"

import { addToWishlist, fetchWishlistItems, updateWishlistItemQty, deleteWishlistItem } from "../../controllers/shop/wishlist-controller.js"

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/get/:userId", fetchWishlistItems);
router.put("/update-Wishlist", updateWishlistItemQty);
router.delete("/:userId/:productId", deleteWishlistItem);

export default router;
