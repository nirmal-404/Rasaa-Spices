
import express from "express"

import {
    getTestResponse
} from "../controllers/test-controller.js"

import { isAdminUser } from "../middlewares/admin-middleware.js"
import { authMiddleware } from "../middlewares/auth-middleware.js"

const router = express.Router();


router.get("/", authMiddleware, isAdminUser, getTestResponse);

export default router;
