import { Schema, model } from "mongoose";
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
    } ,
    
    createdAt: {
        type: Date,
        timestamps: true
    },
    updatedAt: {
        type: Date,
        timestamps: true
    }
})
const Contact =model("contact", contactSchema)
export default Contact