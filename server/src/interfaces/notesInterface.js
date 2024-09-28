export class Inotes {
    async getNotes() {
        throw new Error("method get_notes is not overwritten.")
    }

    async getNote(id) {
        throw new Error("method get_note is not overwritten.")
    }

    async deleteNotes() {
        throw new Error("method delete_notes is not overwritten.")
    }

    async deleteNote(id) {
        throw new Error("method delete_note is not overwritten.")
    }

    async createNote(id, title, content) {
        throw new Error("method create_note is not overwritten.")
    }

    async editNote(id, title, content) {
        throw new Error("method edit_note is not overwritten.")
    }
}
