import path from 'node:path'
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
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const PUBLIC_POSTERS_DIR = path.resolve("src", "public", "photos");
export const PUBLIC_DIR = path.resolve("src", "public");