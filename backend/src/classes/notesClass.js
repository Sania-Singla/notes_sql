// general
import { NotesInterface } from "../interfaces/notesInterface.js";
import { connection } from "../server.js";

// for mongodb
import { Note } from "../models/notesSchema.js";
import { isValidObjectId } from "mongoose";

class MysqlNotesClass extends NotesInterface {
    async get_all_notes() {
        try {
            const [result] = await connection.query("select * from notes");
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
    async get_a_note(id) {
        try {
            const [[result]] = await connection.query(
                "select * from notes where _id=?",
                [id]
            );
            if (result) return result;
            else return { message: "NOTE_NOT_FOUND" };
            // return result[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async delete_all_notes() {
        try {
            return await connection.query("truncate table notes");
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async delete_a_note(id) {
        try {
            return await connection.query("delete from notes where _id=?", [
                id,
            ]);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async create_a_note(title, content) {
        try {
            const [result] = await connection.query(
                "insert into notes (title,content) values(?,?)",
                [title, content]
            );
            return { id: result.insertId };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async edit_a_note(title, content, id) {
        try {
            return await connection.query(
                "update notes set title=?, content=? where _id=?",
                [title, content, id]
            );
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

class MongodbNotesClass extends NotesInterface {
    async get_all_notes() {
        try {
            return await Note.find();
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async get_a_note(id) {
        try {
            if (!isValidObjectId(id)) return { message: "INVALID_ID" };
            const note = await Note.findById(id);
            if (note) return note;
            else return { message: "NOTE_NOT_FOUND" };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async delete_all_notes() {
        try {
            return await Note.deleteMany();
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async delete_a_note(id) {
        try {
            if (!isValidObjectId(id)) return { message: "INVALID_ID" };
            const note = await Note.findByIdAndDelete(id);
            if (note) return;
            else return { message: "NOTE_NOT_FOUND" };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async create_a_note(title, content) {
        try {
            return await Note.create({ title, content });
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async edit_a_note(title, content, id) {
        try {
            if (!isValidObjectId(id)) return { message: "INVALID_ID" };
            const note = await Note.findById(id);
            if (note) {
                note.title = title;
                note.content = content;
                return await note.save();
            } else return { message: "NOTE_NOT_FOUND" };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export { MysqlNotesClass, MongodbNotesClass };
