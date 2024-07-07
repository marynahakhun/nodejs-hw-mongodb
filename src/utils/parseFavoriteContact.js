import { typeList } from "../constant/index.js";
const isBoolean = value => {
    if (typeof value !== "string") return;
    if (!["true", "false"].includes(value)) return;
     return value === "true";
}

const parseFavoriteContact = ({ type, isFavourite }) => {
      const parsedType = typeList.includes(type) ? type : null;
    const parsedFavorite = isBoolean(isFavourite);
    
    return {
        type: parsedType,
        isFavourite: parsedFavorite,
    }
}
export default parseFavoriteContact