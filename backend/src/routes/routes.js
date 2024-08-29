import express from "express";
export const notesRouter = express.Router();

import { 
    get_notes,
    get_note,
    create_note,
    delete_all_notes ,
    delete_note,
    edit_note,
    } from "../controllers/notesController.js";

notesRouter.route("/")
.get(get_notes)
.post(create_note)
.delete(delete_all_notes);

notesRouter.route("/:id")
.get(get_note)
.delete(delete_note)
.patch(edit_note);