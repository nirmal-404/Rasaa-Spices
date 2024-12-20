import express from "express";
import upload from "../Util/uploads.js"; // Multer middleware
import { addUser, deleteUser, getuser, getUsers, updateUser } from "../controllers/userController.js";

const route = express.Router(); // Initialize the router

// Define routes
route.post("/register", upload.single('image'), addUser);
route.get("/", getUsers);
route.get("/:id", getuser);
route.put('/update/:id', upload.single('image'), updateUser);
route.delete('/delete/:id',deleteUser);

export default route;
