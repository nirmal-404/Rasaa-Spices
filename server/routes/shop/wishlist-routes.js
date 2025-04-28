import express from "express"

import { addToWishlist, fetchWishlistItems, updateWishlistItemQty, deleteWishlistItem } from "../../controllers/shop/wishlist-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";


const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);
router.get("/get/:userId", authMiddleware, fetchWishlistItems);
router.put("/update-Wishlist", authMiddleware, updateWishlistItemQty);
router.delete("/:userId/:productId", authMiddleware, deleteWishlistItem);

export default router;
