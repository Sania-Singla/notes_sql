export class Inotes {
    async getNotes(query) {
        throw new Error('method getNotes is not overwritten.');
    }

    async getNote(noteId) {
        throw new Error('method getNote is not overwritten.');
    }

    async deleteNotes() {
        throw new Error('method deleteNotes is not overwritten.');
    }

    async deleteNote(noteId) {
        throw new Error('method deleteNote is not overwritten.');
    }

    async createNote(noteId, title, content) {
        throw new Error('method createNote is not overwritten.');
    }

    async updateNote(noteId, title, content) {
        throw new Error('method updateNote is not overwritten.');
    }
}
