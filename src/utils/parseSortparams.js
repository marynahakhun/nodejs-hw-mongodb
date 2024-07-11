const parseSortParams = ({ sortBy, sortOrder }, fieldList) => {
    const parseSortOrder = ["asc", "desc"].includes(sortOrder) ? sortOrder : ("asc");
    const parseSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];
    return {
        sortBy: parseSortBy,
        sortOrder:parseSortOrder,
    }
}
export default parseSortParams