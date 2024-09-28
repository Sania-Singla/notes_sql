import { Inotes } from "../interfaces/notesInterface.js";
import { connection } from "../server.js";

export class MysqlNotesClass extends Inotes {
    async getNotes() {
        try {
            const q = "SELECT * FROM notes ORDER BY updatedAt DESC";
            const [notes] = await connection.query(q);
            if (!notes.length) {
                return { message: "NO_NOTES_FOUND" };
            }
            return notes;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getNote(noteId) {
        try {
            const q = "SELECT * FROM notes WHERE noteId = ?";
            const [[result]] = await connection.query(q, [noteId]);
            if (!result) {
                return { message: "NOTE_NOT_FOUND" };
            }
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteNotes() {
        try {
            const q = "TRUNCATE TABLE notes";
            await connection.query(q);
            return { message: "NOTES_DELETED_SUCCESSFULLY" };
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteNote(noteId) {
        try {
            const q = "DELETE FROM notes WHERE noteId = ?";
            const [res] = await connection.query(q, [noteId]);
            if (res.affectedRows === 0) {
                throw new Error({ message: "NOTE_DELETION_DB_ISSUE" });
            }
            return { message: `NOTE_ID:${noteId}_DELETED_SUCCESSFULLY` };
        } catch (err) {
            throw new Error(err);
        }
    }

    async createNote(noteId, title, content) {
        try {
            const q = "INSERT INTO notes (noteId, title, content) VALUES(?, ?, ?)";
            await connection.query(q, [noteId, title, content]);
            const note = await this.getNote(noteId);

            if (note?.message) {
                throw new Error({ message: "NOTE_CREATION_DB_ISSUE" });
            }
            return note;
        } catch (err) {
            throw new Error(err);
        }
    }

    async editNote(noteId, title, content, updatedAt) {
        try {
            const q = "UPDATE notes SET title=?, content=?, updatedAt = ? WHERE noteId = ?";
            await connection.query(q, [title, content, updatedAt, noteId]);
            const note = await this.getNote(noteId);
            if (note?.message) {
                throw new Error({ message: "NOTE_UPDATION_DB_ISSUE" });
            }
            return note;
        } catch (err) {
            throw new Error(err);
        }
    }
}
