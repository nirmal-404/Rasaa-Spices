import express from "express"

import {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
    cancelOrder
} from "../../controllers/admin/order-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { isAdminUser } from "../../middlewares/admin-middleware.js";
const router = express.Router();

router.get("/get", authMiddleware, isAdminUser, getAllOrdersOfAllUsers);
router.get("/details/:id", authMiddleware, isAdminUser, getOrderDetailsForAdmin);
router.put("/update/:id", authMiddleware, isAdminUser, updateOrderStatus);
router.delete("/cancel/:id", authMiddleware, isAdminUser, cancelOrder);

export default router;
