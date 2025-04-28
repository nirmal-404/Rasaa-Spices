import express from "express"

import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addAddress);
router.get("/get/:userId", authMiddleware, fetchAllAddress);
router.delete("/delete/:userId/:addressId", authMiddleware, deleteAddress);
router.put("/update/:userId/:addressId", authMiddleware, editAddress);

export default router;
