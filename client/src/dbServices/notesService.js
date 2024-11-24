class NotesServices {
    async createNote(inputs) {
        try {
            const res = await fetch('/api/v1/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with createNote service',
                err.message
            );
        }
    }

    async getNote(noteId) {
        try {
            const res = await fetch(`/api/v1/notes/${noteId}`, {
                method: 'GET',
            });

            const data = await res.json();
            console.log(data);

            if (res.ok || res.status === 400) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with getNote service',
                err.message
            );
        }
    }

    async getNotes(query) {
        try {
            const res = await fetch(`/api/v1/notes?query=${query}`, {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with getNotes service',
                err.message
            );
        }
    }

    async deleteNote(noteId) {
        try {
            const res = await fetch(`/api/v1/notes/${noteId}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with deleteNote service',
                err.message
            );
        }
    }

    async deleteNotes() {
        try {
            const res = await fetch('/api/v1/notes', {
                method: 'DELETE',
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with deleteNotes service',
                err.message
            );
        }
    }

    async editNote(noteId, inputs) {
        try {
            const res = await fetch(`/api/v1/notes/${noteId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            return console.log(
                'something is wrong with editNote service',
                err.message
            );
        }
    }
}

export const notesServices = new NotesServices();
