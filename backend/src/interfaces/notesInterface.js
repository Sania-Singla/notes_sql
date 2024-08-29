export class NotesInterface {
    async get_all_notes (res) {
        throw new Error("method get_all_notes is not overwritten.");
    }

    async get_a_note (res,id) {
        throw new Error("method get_a_note is not overwritten.");
    }

    async delete_all_notes (res) {
        throw new Error("method delete_all_notes is not overwritten.");
    }

    async delete_a_note (res,id) {
        throw new Error("method delete_a_note is not overwritten.");
    }

    async create_a_note (res,title,content) {
        throw new Error("method create_a_note is not overwritten.");
    }
    
    async edit_a_note (res,title,content,id) {
        throw new Error("method edit_a_note is not overwritten.");
    }
} 