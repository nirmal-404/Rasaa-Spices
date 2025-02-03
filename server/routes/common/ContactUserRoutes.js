import express from 'express';
import { addContactUs, deleteContact, getContact, getContacts, updateContact } from '../../controllers/common/contactUserController.js';

const routeContact = express.Router();

routeContact.post("/", addContactUs);
routeContact.get("/contacts", getContacts);
routeContact.get("/:id", getContact);
routeContact.put("/:id", updateContact);
routeContact.delete("/:id", deleteContact);




export default routeContact;
