import express from "express";
import isValidId from "../midldlewares/isValidId.js";
import ctrlWrapper from '../utils/ctrlWrapper.js'
import { addContactController, getAllContactsController, getContactsByIdController, deleteContactController, updateContactController } from "../controllers/contacts-controller.js";
const contactsRouter = express.Router()

contactsRouter.get("/", ctrlWrapper(getAllContactsController) )
contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post("/", ctrlWrapper(addContactController))
contactsRouter.patch("/:id", isValidId, ctrlWrapper(updateContactController))
contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController))
  export default contactsRouter