export class Inotes {
  async getNotes() {
    throw new Error("method get_all_notes is not overwritten.");
  }

  async getNote(id) {
    throw new Error("method get_a_note is not overwritten.");
  }

  async deleteNotes() {
    throw new Error("method delete_all_notes is not overwritten.");
  }

  async deleteNote(id) {
    throw new Error("method delete_a_note is not overwritten.");
  }

  async createNote(title, content) {
    throw new Error("method create_a_note is not overwritten.");
  }

  async editNote(title, content, id) {
    throw new Error("method edit_a_note is not overwritten.");
  }
}
