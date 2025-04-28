import express from 'express';
import {
    deleteContactForm,
    getAllContactForms
} from '../../controllers/admin/contactus-controller.js';
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { isAdminUser } from "../../middlewares/admin-middleware.js";

const routeContact = express.Router();

routeContact.get("/", authMiddleware, isAdminUser, getAllContactForms);
routeContact.delete("/:id", authMiddleware, isAdminUser, deleteContactForm);

export default routeContact;
