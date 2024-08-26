import { pool } from "./database.js";

const get_notes = async (req,res) => {
    try {
        const [result] = await pool.query("select * from notes");
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve notes.",err });
    }
}

const create_note = async (req,res) => {
    const {title,content} = req.body;
    try {
        if(!title || !content) return res.status(400).json({message:"title and content are required."}); 
        const [result] = await pool.query("insert into notes (title,content) values(?,?)",[title,content]);
        return res.status(200).json({id:result.insertId});
    } catch (err) {
        return res.status(500).json({ error: "Failed to create note." ,err});
    }
}

const get_note = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id) return res.status(400).json({message:"id is missing."}); 
        const [result] = await pool.query("select * from notes where id=?",[id]);
        return res.status(200).json(result[0]);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve the note.",err });
    }
}

const delete_all_notes = async (req,res) => {
    try {
        await pool.query("truncate table notes");
        return res.status(200).json({message:"all notes deleted!!"});
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete notes.", err });
    }
}

const delete_note = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id) return res.status(400).json({message:"id is missing."}); 
        await pool.query("delete from notes where id=?",[id]);
        return res.status(200).json({message:"note deleted successfully!!"});
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete the note.", err });
    }
}

const edit_note = async (req,res) => {
    const {id} = req.params;
    const {title,content} = req.body;
    try {
        await pool.query("update notes set title=?, content=? where id=?",[title,content,id]);
        const [edittedNote] = await pool.query("select * from notes where id=?",[id]);
        return res.status(200).json(edittedNote[0]);
    } catch (err) {
        return res.status(500).json({message:"failed to edit the note",err});
    }
}

export {
    get_notes,
    get_note,
    delete_all_notes,
    create_note,
    delete_note,
    edit_note,
};