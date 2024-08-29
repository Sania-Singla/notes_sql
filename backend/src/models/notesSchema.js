import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true});

export const Note = mongoose.model("Note",notesSchema);   // will be as notes