import express from "express"

import {
    getHeroImage,
    addHeroImage,
    deleteHeroImage
} from "../../controllers/common/hero-img-controller.js"
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { isAdminUser } from "../../middlewares/admin-middleware.js";
const router = express.Router();

router.post("/add", authMiddleware, isAdminUser, addHeroImage);
router.get("/get", getHeroImage);
router.delete("/delete/:id", authMiddleware, isAdminUser, deleteHeroImage);


export default router;
