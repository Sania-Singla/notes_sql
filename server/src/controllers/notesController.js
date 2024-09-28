import getServiceObject from "../db/serviceObjects.js";
import { v4 as uuid } from "uuid";
import { OK, SERVER_ERROR, BAD_REQUEST } from "../constants/errorCodes.js";

const notesObject = getServiceObject("notes");

const getNotes = async (req, res) => {
    try {
        const result = await notesObject.getNotes();
        return res.status(OK).json(result);
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to retrieve notes.", message: err.message });
    }
};

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "title and content are required." });
        }
        const id = uuid();
        const result = await notesObject.createNote(id, title, content);
        return res.status(OK).json(result);
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to create note.", message: err.message });
    }
};

const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(BAD_REQUEST).json({ message: "id is missing." });
        }
        const result = await notesObject.getNote(id);
        if (result?.message) {
            return res.status(BAD_REQUEST).json({ message: result.message });
        } else {
            return res.status(OK).json(result);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: "Failed to retrieve the note.",
            message: err.message,
        });
    }
};

const deleteNotes = async (req, res) => {
    try {
        await notesObject.deleteNotes();
        return res.status(OK).json({ message: "all notes deleted!!" });
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to delete notes.", message: err.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(BAD_REQUEST).json({ message: "id is missing." });
        }
        await notesObject.deleteNote(id);
        return res.status(OK).json({ message: "note deleted successfully!!" });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: "Failed to delete the note.",
            message: err.message,
        });
    }
};

const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await notesObject.editNote(id, title, content);
        return res.status(OK).json(result);
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ message: "failed to edit the note", message: err.message });
    }
};

export { getNotes, getNote, deleteNotes, createNote, deleteNote, editNote };
