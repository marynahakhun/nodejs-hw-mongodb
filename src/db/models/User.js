import { Schema, model } from "mongoose";
import { emailRegex } from "../../constant/index.js";
import { mongooseSaveError } from "./hooks.js";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        unique: true,
        type: String,
        Match: emailRegex,
        required: true,
    },
    password: {
        required: true,
        type: String,
    }
}, {
    ersionKey: false,
    timestamps:true
})
userSchema.post("save", mongooseSaveError);
userSchema.post("findOneAndUpdate", mongooseSaveError);
const User = model("user", userSchema)
export default User;