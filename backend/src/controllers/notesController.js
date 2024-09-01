import getServiceObject from "../db/serviceObjects.js";

const userObject = getServiceObject("notes");

const get_notes = async (req, res) => {
    try {
        const result = await userObject.get_all_notes();
        return res.status(200).json(result);
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Failed to retrieve notes.", message: err.message });
    }
};

const create_note = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content)
            return res
                .status(400)
                .json({ message: "title and content are required." });
        const result = await userObject.create_a_note(title, content);
        return res.status(200).json(result);
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Failed to create note.", message: err.message });
    }
};

const get_note = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "id is missing." });
        const result = await userObject.get_a_note(id);
        if (result?.message)
            return res.status(400).json({ message: result.message });
        else return res.status(200).json(result);
    } catch (err) {
        return res
            .status(500)
            .json({
                error: "Failed to retrieve the note.",
                message: err.message,
            });
    }
};

const delete_all_notes = async (req, res) => {
    try {
        await userObject.delete_all_notes();
        return res.status(200).json({ message: "all notes deleted!!" });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Failed to delete notes.", message: err.message });
    }
};

const delete_note = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "id is missing." });
        const result = await userObject.delete_a_note(id);
        if (result?.message)
            return res.status(400).json({ message: result.message });
        else
            return res
                .status(200)
                .json({ message: "note deleted successfully!!" });
    } catch (err) {
        return res
            .status(500)
            .json({
                error: "Failed to delete the note.",
                message: err.message,
            });
    }
};

const edit_note = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await userObject.edit_a_note(title, content, id);
        if (result?.message)
            return res.status(400).json({ message: result.message });
        else {
            const result = await userObject.get_a_note(id);
            return res.status(200).json(result);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "failed to edit the note", message: err.message });
    }
};

export {
    get_notes,
    get_note,
    delete_all_notes,
    create_note,
    delete_note,
    edit_note,
};
