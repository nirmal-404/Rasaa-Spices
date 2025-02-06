import express from 'express';
import {
    deleteContactForm,
    getAllContactForms
} from '../../controllers/admin/contactus-controller.js';

const routeContact = express.Router();

routeContact.get("/", getAllContactForms);
routeContact.delete("/:id", deleteContactForm);

export default routeContact;
