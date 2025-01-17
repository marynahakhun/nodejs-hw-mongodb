import createHttpError from "http-errors"
import parsePaginationParams from "../utils/parsePaginatilonParams.js"
import parseSortParams from "../utils/parseSortparams.js"
import parseFavoriteContact from "../utils/parseFavoriteContact.js";
import { contactFieldList } from "../constant/index.js"
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js'
import saveFileToPublicDir from "../utils/saveFileToPublicDir.js";
  import env from "../utils/env.js";
import { addContact, deleteContact, getContactByFilter, getContacts, upsertContact } from "../sevices/contacts.js"
const enable_cloudinary = env("ENABLE_CLOUDINARY");

export const getAllContactsController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;


    const {sortBy, sortOrder} = parseSortParams(req.query, contactFieldList)
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = { ...parseFavoriteContact(req.query), userId }
    const data = await getContacts({
        page,
        perPage,
        filter,
        sortBy,
        sortOrder,
    });
    res.json({
        status: 200,
        data,
        message:"success found contact"
    })
   
}
export const getContactsByIdController =async (req, res, next) => {
    const { _id: userId } = req.user;

            const { id } = req.params;

            const data = await getContactByFilter({_id:id, userId});

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
    
    const { _id: userId } = req.user
    let photo = "";
    if(req.file) {
        if(enable_cloudinary === "true") {
            photo = await saveFileToCloudinary(req.file, "photos");
        }
        else {
            photo = await saveFileToPublicDir(req.file, "photos");
        }
    }
    const data = await addContact({...req.body, userId, photo});
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })

}
export const updateContactController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    let photo = "";
     if (req.file) {
        if (enable_cloudinary === "true") {
            photo = await saveFileToCloudinary(req.file, "photos");
        } else {
            photo = await saveFileToPublicDir(req.file, "photos");
        }
     }
     const updatedData = { ...req.body, userId };
    if (photo) {
        updatedData.photo = photo;
    }

    const result = await upsertContact({ _id: id, userId }, updatedData);
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
        const { _id: userId } = req.user;

    const data = await deleteContact({ _id: id, userId })
     if (!data) {
       throw createHttpError(404, `contact with id ${id} not found`)
     }
    res.status(204).send()
 }