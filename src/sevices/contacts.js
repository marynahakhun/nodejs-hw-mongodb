import Contact from "../db/models/Contact.js";
export const getContacts = async ({ filter = {}, page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' }) => {
    try {
        const skip = (page - 1) * perPage;
        const databaseQuery = Contact.find();

        // Застосування фільтрів
        if (filter.type) {
            databaseQuery.where("contactType").equals(filter.type);
        }
        if (filter.isFavourite !== undefined) {
            databaseQuery.where("isFavourite").equals(filter.isFavourite);
        }

        // Отримання відфільтрованих та відсортованих елементів
        const items = await databaseQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });

        // Підрахунок загальної кількості елементів з урахуванням фільтрів
        const totalItems = await Contact.find().merge(databaseQuery).countDocuments();

        // Визначення кількості сторінок
        const totalPages = Math.ceil(totalItems / perPage);

        // Перевірка наявності наступної та попередньої сторінок
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
            items,
            totalItems,
            page,
            perPage,
            totalPages,
            hasPreviousPage,
            hasNextPage,
        };
    } catch (error) {
        console.error("Error in getContacts:", error);
        throw error;
    }
}
export const getContactById = id => Contact.findById(id);
export const addContact = data => Contact.create(data);
export const upsertContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data,
        {
            new: true,
            runValidators: true,
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