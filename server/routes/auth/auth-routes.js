import express from "express";
import { registerUser, getUsers, getuser, updateUser, deleteUser, loginUser, logoutUser, } from "../../controllers/auth/auth-controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.userInfo;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});

export default router;
