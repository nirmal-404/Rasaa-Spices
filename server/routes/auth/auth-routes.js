import express from "express";
import { registerUser, getUsers, getuser, updateUser, deleteUser, loginUser, logoutUser, authMiddleware } from "../../controllers/auth/auth-controller.js";

const router = express.Router(); // Initialize the router

// Define routes
// route.post("/", upload.single('image'), registerUser);
// route.get("/", getUsers);
// route.get("/:id", getuser);
// route.put('/:id', upload.single('image'), updateUser);
// route.delete('/:id',deleteUser);

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});

export default router;
