import express from 'express'

import { upload } from '../../helpers/cloudinary.js'
import { handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct, } from '../../controllers/admin/products-controller.js';
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { isAdminUser } from "../../middlewares/admin-middleware.js";

const router = express.Router();

router.post("/upload-image", authMiddleware, isAdminUser, upload.single("my_file"), handleImageUpload);
router.post("/add", authMiddleware, isAdminUser, addProduct);
router.put("/edit/:id", authMiddleware, isAdminUser, editProduct);
router.delete("/delete/:id", authMiddleware, isAdminUser, deleteProduct);
router.get("/get", authMiddleware, isAdminUser, fetchAllProducts);

export default router;