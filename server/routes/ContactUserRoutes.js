import express from 'express';
import { addContactUs, deleteContact, getContact, getContacts, updateContact } from '../controllers/contactUserController.js';

const routeContact = express.Router();

routeContact.post("/addContact", addContactUs);
routeContact.get("/getContacts", getContacts);
routeContact.get("/getContact/:id", getContact);
routeContact.put("/updateContact/:id", updateContact);
routeContact.delete("/deleteContact/:id", deleteContact);




export default routeContact;
