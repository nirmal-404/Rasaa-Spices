import express from "express"

import {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  createOrderForPaypalPayments
} from "../../controllers/shop/order-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/create-with-paypal", authMiddleware, createOrderForPaypalPayments);
router.post("/capture", capturePayment);
router.get("/list/:userId", authMiddleware, getAllOrdersByUser);
router.get("/details/:id", authMiddleware, getOrderDetails);

export default router;
