import { Inotes } from '../interfaces/notesInterface.js';
import { connection } from '../server.js';

export class MysqlNotesClass extends Inotes {
    async getNotes(query) {
        try {
            let q = 'SELECT * FROM notes';
            if (query) {
                q += ' WHERE title LIKE ?';
            }
            q += ' ORDER BY updatedAt DESC, createdAt DESC';

            const params = query ? [`%${query}%`] : [];

            const [notes] = await connection.query(q, params);
            if (!notes.length) {
                return { message: 'NO_NOTES_FOUND' };
            }
            return notes;
        } catch (err) {
            throw err;
        }
    }

    async getNote(noteId) {
        try {
            const q = 'SELECT * FROM notes WHERE noteId = ?';
            const [[result]] = await connection.query(q, [noteId]);
            if (!result) {
                return { message: 'NOTE_NOT_FOUND' };
            }
            return result;
        } catch (err) {
            throw err;
        }
    }

    async deleteNotes() {
        try {
            const q = 'TRUNCATE TABLE notes';
            await connection.query(q);
            return { message: 'NOTES_DELETED_SUCCESSFULLY' };
        } catch (err) {
            throw err;
        }
    }

    async deleteNote(noteId) {
        try {
            const q = 'DELETE FROM notes WHERE noteId = ?';
            const [res] = await connection.query(q, [noteId]);
            if (res.affectedRows === 0) {
                throw new Error('NOTE_DELETION_DB_ISSUE');
            }
            return { message: `NOTE_ID:${noteId}_DELETED_SUCCESSFULLY` };
        } catch (err) {
            throw err;
        }
    }

    async createNote(noteId, title, content) {
        try {
            const q =
                'INSERT INTO notes (noteId, title, content) VALUES(?, ?, ?)';
            await connection.query(q, [noteId, title, content]);
            const note = await this.getNote(noteId);

            if (note?.message) {
                throw new Error('NOTE_CREATION_DB_ISSUE');
            }
            return note;
        } catch (err) {
            throw err;
        }
    }

    async updateNote(noteId, title, content) {
        try {
            const q =
                'UPDATE notes SET title = ?, content = ? WHERE noteId = ?';
            await connection.query(q, [title, content, noteId]);
            const note = await this.getNote(noteId);
            if (note?.message) {
                throw new Error('NOTE_UPDATION_DB_ISSUE');
            }
            return note;
        } catch (err) {
            throw err;
        }
    }
}
