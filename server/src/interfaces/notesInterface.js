export class Inotes {
    async getNotes() {
        throw new Error("method get_notes is not overwritten.");
    }

    async getNote(noteId) {
        throw new Error("method get_note is not overwritten.");
    }

    async deleteNotes() {
        throw new Error("method delete_notes is not overwritten.");
    }

    async deleteNote(noteId) {
        throw new Error("method delete_note is not overwritten.");
    }

    async createNote(noteId, title, content) {
        throw new Error("method create_note is not overwritten.");
    }

    async editNote(noteId, title, content,updatedAt) {
        throw new Error("method edit_note is not overwritten.");
    }
}
