export const contactFieldList = [
    "_id",
    "name",
    "phoneNumber",
    "email",
    "isFavourite",
    "contactType",
    "createdAt",
    "updatedAt"
];
export const typeList = ["work", "home", "personal"];
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFETIME = 7 * 24 * 3600 * 1000;