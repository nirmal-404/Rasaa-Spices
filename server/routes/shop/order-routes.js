import express from "express"

import {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  generateHash
} from "../../controllers/shop/order-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/capture", capturePayment);

// for payhere api 
router.post("/generate-hash", generateHash);

router.get("/list/:userId", authMiddleware, getAllOrdersByUser);
router.get("/details/:id", authMiddleware, getOrderDetails);

export default router;
