import express from 'express';
import { addContactUs, deleteContact, getContact, getContacts, updateContact } from '../../controllers/comman/contactUserController.js';

const routeContact = express.Router();

routeContact.post("/", addContactUs);
routeContact.get("/get", getContacts);
routeContact.get("/:id", getContact);
routeContact.put("/:id", updateContact);
routeContact.delete("/delete/:id", deleteContact);




export default routeContact;
