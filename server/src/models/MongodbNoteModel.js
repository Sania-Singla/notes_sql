import { Inotes } from "../interfaces/notesInterface.js";
import { Note } from "../schemas/mongodbNotesSchema.js";

export class MongodbNotesClass extends Inotes {
    async getNotes() {
        try {
            const notes = await Note.find({}, null, { sort: { updatedAt: -1, createdAt: -1 } }); // 1 => asc, -1 => desc  // sort needs to be the 3rd parameter
            if (notes?.length === 0) {
                return { message: "NO_NOTES_FOUND" };
            }
            return notes;
        } catch (err) {
            throw new Error(err);
        }
    }
    async getNote(noteId) {
        try {
            const note = await Note.findOne({ noteId });
            if (!note) {
                return { message: "NOTE_NOT_FOUND" };
            }
            return note;
        } catch (err) {
            throw new Error(err);
        }
    }
    async deleteNotes() {
        try {
            const deletedNotes = await Note.deleteMany();
            return { message: "NOTES_DELETED_SUCCESSFULLY" };
        } catch (err) {
            throw new Error(err);
        }
    }
    async deleteNote(noteId) {
        try {
            const deletedNote = await Note.deleteOne({ noteId });
            if (!deletedNote) {
                throw new Error({ message: "NOTE_DELETION_DB_ISSUE" });
            }
            return { message: `NOTE_ID:${noteId}_DELETED_SUCCESSFULLY` };
        } catch (err) {
            throw new Error(err);
        }
    }
    async createNote(noteId, title, content) {
        try {
            const note = await Note.create({ noteId, title, content });
            if (!note) {
                throw new Error({ message: "NOTE_CREATION_DB_ISSUE" });
            }
            return note;
        } catch (err) {
            throw new Error(err);
        }
    }
    async editNote(noteId, title, content, updatedAt) {
        try {
            const note = await Note.findOneAndUpdate(
                { noteId },
                {
                    title,
                    content,
                    // updatedAt,
                },
                { new: true }
            );
            if (!note) {
                throw new Error({ message: "NOTE_UPDATION_DB_ISSUE" });
            }
            return note;
        } catch (err) {
            throw new Error(err);
        }
    }
}
