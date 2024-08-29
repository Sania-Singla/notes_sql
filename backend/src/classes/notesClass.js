import mongoose from "mongoose";
import { pool } from "../db/dbConnection.js";
import { NotesInterface } from "../interfaces/notesInterface.js";
import {Note} from "../models/notesSchema.js";

class MysqlNotesClass extends NotesInterface{

    async get_all_notes (res) {
        try {
            const [result] = await pool.query("select * from notes");
            return result;
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve notes.",err });
        }
    }
    async get_a_note (res,id) {
        try {
            const [result] = await pool.query("select * from notes where _id=?",[id]);
            return result[0];
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve the note.",err });
        }
    }
    async delete_all_notes (res) {
        try {
            await pool.query("truncate table notes");
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete notes.", err });
        }
    }
    async delete_a_note (res,id) {
        try {
            await pool.query("delete from notes where _id=?",[id]);
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete the note.", err });
        }
    }
    async create_a_note (res,title,content) {
        try {
            const [result] = await pool.query("insert into notes (title,content) values(?,?)",[title,content]);
            return {id:result.insertId};
        } catch (err) {
            return res.status(500).json({ error: "Failed to create note." ,err});
        }
    }
    async edit_a_note (res,title,content,id) {
        try {
            await pool.query("update notes set title=?, content=? where _id=?",[title,content,id]);
            return;
        } catch (err) {
            return res.status(500).json({message:"failed to edit the note",err});
        }
    }
} 


class MongodbNotesClass extends NotesInterface{

    async get_all_notes (res) {
        try {
            const result = await Note.find();
            return result;
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve notes.",err });
        }
    }
    async get_a_note (res,id) {
        try {
            const result = await Note.findById(id);
            return result;
        } catch (err) {
            return res.status(500).json({ error: "Failed to retrieve the note.",err });
        }
    }
    async delete_all_notes (res) {
        try {
            await Note.deleteMany();
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete notes.", err });
        }
    }
    async delete_a_note (res,id) {
        try {
            await Note.findByIdAndDelete(id);
            return;
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete the note.", err });
        }
    }
    async create_a_note (res,title,content) {
        try {
            const result = await Note.create({title, content})
            return result;
        } catch (err) {
            return res.status(500).json({ error: "Failed to create note." ,err:err.message});
        }
    }
    async edit_a_note (res,title,content,id) {
        try {
            const note = await Note.findById(id);
            note.title = title;
            note.content = content;
            await note.save();
            return;
        } catch (err) {
            return res.status(500).json({message:"failed to edit the note",err});
        }
    }
} 

export {
    MysqlNotesClass,
    MongodbNotesClass,
}