import getServiceObject from "../db/serviceObjects.js";
import { OK, SERVER_ERROR, BAD_REQUEST } from "../constants/errorCodes.js";

const userObject = getServiceObject("notes");

const getNotes = async (req, res) => {
    try {
        const result = await userObject.getNotes();
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
        const result = await userObject.createNote(title, content);
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
        const result = await userObject.getNote(id);
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
        await userObject.deleteNotes();
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
        const result = await userObject.deleteNote(id);
        if (result?.message) {
            return res.status(BAD_REQUEST).json({ message: result.message });
        } else {
            return res
                .status(OK)
                .json({ message: "note deleted successfully!!" });
        }
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
        const result = await userObject.editNote(title, content, id);
        if (result?.message) {
            return res.status(BAD_REQUEST).json({ message: result.message });
        } else {
            const result = await userObject.getNote(id);
            return res.status(OK).json(result);
        }
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ message: "failed to edit the note", message: err.message });
    }
};

export {
    get_notes,
    get_note,
    delete_notes,
    create_note,
    delete_note,
    edit_note,
};
