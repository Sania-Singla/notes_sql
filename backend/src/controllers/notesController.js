import getServiceObject from "../db/serviceObjects.js";
import { OK, SERVER_ERROR, BAD_REQUEST } from "../constants/errorCodes.js";

const userObject = getServiceObject("notes");

const get_notes = async (req, res) => {
    try {
        const result = await userObject.get_notes();
        return res.status(OK).json(result);
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to retrieve notes.", message: err.message });
    }
};

const create_note = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "title and content are required." });
        }
        const result = await userObject.create_note(title, content);
        return res.status(OK).json(result);
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to create note.", message: err.message });
    }
};

const get_note = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(BAD_REQUEST).json({ message: "id is missing." });
        }
        const result = await userObject.get_note(id);
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

const delete_notes = async (req, res) => {
    try {
        await userObject.delete_notes();
        return res.status(OK).json({ message: "all notes deleted!!" });
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .json({ error: "Failed to delete notes.", message: err.message });
    }
};

const delete_note = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(BAD_REQUEST).json({ message: "id is missing." });
        }
        const result = await userObject.delete_note(id);
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

const edit_note = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await userObject.edit_note(title, content, id);
        if (result?.message) {
            return res.status(BAD_REQUEST).json({ message: result.message });
        } else {
            const result = await userObject.get_note(id);
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
