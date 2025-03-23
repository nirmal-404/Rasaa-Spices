import express from "express"

import {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
    cancelOrder
} from "../../controllers/admin/order-controller.js"

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
router.delete("/cancel/:id", cancelOrder);

export default router;
