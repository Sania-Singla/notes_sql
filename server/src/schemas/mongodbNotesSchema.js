import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
    {
        noteId: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Note = mongoose.model('Note', notesSchema);
