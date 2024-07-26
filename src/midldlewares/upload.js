import multer from "multer";
import createHttpError from "http-errors";

import { TEMPLATES_DIR } from "../constant/index.js";

const storage = multer.diskStorage({
    destination: TEMPLATES_DIR,
    filename: (req, file, callback)=> {
        const uniquePreffix = Date.now();
        const filename = `${uniquePreffix}_${file.originalname}`;
        callback(null, filename);
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return callback(createHttpError(400, ".exe file not allow"));
    }
    callback(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;