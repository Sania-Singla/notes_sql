import getServiceObject from "../db/serviceObjects.js";
import { v4 as uuid, validate as isValidUUID } from "uuid";
import { OK, SERVER_ERROR, BAD_REQUEST } from "../constants/errorCodes.js";
import { getCurrentTimestamp } from "../utils/timeStamp.js";

const notesObject = getServiceObject("notes");

const getNotes = async (req, res) => {
    try {
        const { query = "" } = req.query;
        const result = await notesObject.getNotes(query);
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "Failed to retrieve notes.", error: err.message });
    }
};

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_FIELDS" });
        }
        const noteId = uuid();
        const result = await notesObject.createNote(noteId, title, content);
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "Failed to create note.", error: err.message });
    }
};

const getNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_ID" });
        }
        if (!isValidUUID(noteId)) {
            return res.status(BAD_REQUEST).json({ message: "INVALID_NOTE_ID" });
        }
        const result = await notesObject.getNote(noteId);
        if (result?.message) {
            return res.status(BAD_REQUEST).json(result);
        }
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "Failed to retrieve the note.", error: err.message });
    }
};

const deleteNotes = async (req, res) => {
    try {
        const result = await notesObject.deleteNotes();
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "Failed to delete notes.", error: err.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_ID" });
        }
        if (!isValidUUID(noteId)) {
            return res.status(BAD_REQUEST).json({ message: "INVALID_NOTE_ID" });
        }
        const note = await notesObject.getNote(noteId);
        if (note?.message) {
            return res.status(BAD_REQUEST).json(note);
        }
        const result = await notesObject.deleteNote(noteId);
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "Failed to delete the note.", error: err.message });
    }
};

const editNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        const updatedAt = getCurrentTimestamp(new Date());
        if (!isValidUUID(noteId)) {
            return res.status(BAD_REQUEST).json({ message: "INVALID_NOTE_ID" });
        }
        if (!title || !content) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_FIELDS" });
        }
        const note = await notesObject.getNote(noteId);
        if (note?.message) {
            return res.status(BAD_REQUEST).json(note);
        }
        const result = await notesObject.editNote(noteId, title, content, updatedAt);
        return res.status(OK).json(result);
    } catch (err) {
        return res.status(SERVER_ERROR).json({ message: "failed to edit the note", error: err.message });
    }
};

export { getNotes, getNote, deleteNotes, createNote, deleteNote, editNote };
