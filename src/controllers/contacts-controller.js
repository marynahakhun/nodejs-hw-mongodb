import createHttpError from "http-errors"
import { addContact, deleteContact, getContactById, getContacts, upsertContact } from "../sevices/contacts.js"
export const getAllContactsController = async (req, res) => {
   
         const data = await getContacts()
    res.json({
        status: 200,
        data,
        message:"success found contact"
    })
   
}
export const getContactsByIdController =async (req, res, next) => {
  
            const { id } = req.params;

            const data = await getContactById(id);

            if (!data) {
                
                throw createHttpError(404, `Contact with id=${id} not found`);
            }

            res.json({
                status: 200,
                data,
                message: `Contact with id=${id} find success`
            })
        }
        

export const addContactController = async (req, res) => {
    const data = await addContact(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })

}
export const updateContactController = async (req, res) => {
    const { id } = req.params;
    const result = await upsertContact({ _id: id }, req.body);
    if (!result) {
       throw createHttpError(404, `contact with id ${id} not found`)
   }
    res.json({
        status: 200,
        message: "Successfully update",
        data: result.data,
    })
}
export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const data = await deleteContact({ _id: id })
     if (!data) {
       throw createHttpError(404, `contact with id ${id} not found`)
     }
    res.json({
        status: 200,
        message: "Successfully delete",
        data: data,
    })
 }