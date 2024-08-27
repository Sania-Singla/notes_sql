import { pool } from "./database.js";
import { NotesInterface } from "./notesInterface.js";

export class MysqlNotesClass extends NotesInterface{

    async get_all_notes () {
        try {
            const [result] = await pool.query("select * from notes");
            return result;
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve notes.",err });
        }
    }
    async get_a_note (id) {
        try {
            const [result] = await pool.query("select * from notes where id=?",[id]);
            return result[0];
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve the note.",err });
        }
    }
    async delete_all_notes () {
        try {
            await pool.query("truncate table notes");
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete notes.", err });
        }
    }
    async delete_a_note (id) {
        try {
            await pool.query("delete from notes where id=?",[id]);
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete the note.", err });
        }
    }
    async create_a_note (title,content) {
        try {
            const [result] = await pool.query("insert into notes (title,content) values(?,?)",[title,content]);
            return result.insertId;
        } catch (err) {
            return res.status(500).json({ error: "Failed to create note." ,err});
        }
    }
    async edit_a_note (title,content,id) {
        try {
            await pool.query("update notes set title=?, content=? where id=?",[title,content,id]);
            return;
        } catch (err) {
            return res.status(500).json({message:"failed to edit the note",err});
        }
    }
} 