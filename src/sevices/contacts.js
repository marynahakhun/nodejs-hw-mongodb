import Contact from "../db/models/Contact.js";
export const getContacts = () => Contact.find()
export const getContactById = id => Contact.findById(id);
export const addContact = data => Contact.create(data);
export const upsertContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });
    if (!result || !result.value) return null;
    const isNew = Boolean(result?.lastEroorObject?.upserted)
    return {
        data: result.value,
        isNew,
    }
 } 
export const deleteContact = filter => Contact.findOneAndDelete(filter);