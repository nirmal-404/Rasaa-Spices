// routes/paymentRoutes.js
import express from "express";
import { payHereNotify } from "../../controllers/payment/payhere-controller.js";

const router = express.Router();

// ⚠️ Use POST — PayHere sends a POST request
router.post("/notify", payHereNotify);

export default router;
