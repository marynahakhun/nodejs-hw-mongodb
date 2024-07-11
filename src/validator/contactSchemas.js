import Joi from "joi";

export const validateAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").default("personal")
});
export const validateUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number(),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").default("personal")
});