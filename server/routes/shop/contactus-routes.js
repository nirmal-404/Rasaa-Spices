import express from 'express';
import {
    submitContactForm,
    getUserContactForms,
    editContactForm,
    deleteContactForm,
} from '../../controllers/shop/contactus-controller.js';
import { authMiddleware } from "../../middlewares/auth-middleware.js";


const routeContact = express.Router();

routeContact.post("/", submitContactForm);
routeContact.get("/:email", authMiddleware, getUserContactForms);
routeContact.put("/:id", authMiddleware, editContactForm);
routeContact.delete("/:id", authMiddleware, deleteContactForm);

export default routeContact;
