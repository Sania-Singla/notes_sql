import express from 'express';
export const notesRouter = express.Router();

import {
    getNotes,
    getNote,
    createNote,
    deleteNotes,
    deleteNote,
    updateNote,
} from '../controllers/notesController.js';

notesRouter.route('/').get(getNotes).post(createNote).delete(deleteNotes);

notesRouter.route('/:noteId').get(getNote).delete(deleteNote).patch(updateNote);
