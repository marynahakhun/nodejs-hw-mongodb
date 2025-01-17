import express from "express";
import isValidId from "../midldlewares/isValidId.js";
import {validateAddSchema, validateUpdateSchema} from "../validator/contactSchemas.js"
import validateBody from "../utils/validateBody.js";
import authenticate from "../midldlewares/authenticate.js";
import ctrlWrapper from '../utils/ctrlWrapper.js'
import upload from "../midldlewares/upload.js";
import { addContactController, getAllContactsController, getContactsByIdController, deleteContactController, updateContactController } from "../controllers/contacts-controller.js";
const contactsRouter = express.Router()
contactsRouter.use(authenticate);
contactsRouter.get("/", ctrlWrapper(getAllContactsController) )
contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post("/",  upload.single("photo"), validateBody(validateAddSchema), ctrlWrapper(addContactController))
contactsRouter.patch("/:id", upload.single("photo"),  isValidId, validateBody(validateUpdateSchema), ctrlWrapper(updateContactController))
contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController))
  export default contactsRouter