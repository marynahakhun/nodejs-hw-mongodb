import { Schema, model } from "mongoose";
import { mongooseSaveError }  from "./hooks.js";
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
        
     },
    email: {
        type: String,
        required: false
    },
    isFavourite: {
        type: Boolean,
        default:false
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        required: true,
        default: "personal"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
    
 
}, {
    versionKey: false,
    timestamps:true
})
contactSchema.post("save", mongooseSaveError);
contactSchema.post("findOneAndUpdate", mongooseSaveError);
const Contact =model("contact", contactSchema)
export default Contact