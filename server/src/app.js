import express from "express";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { notesRouter } from "./routes/routes.js";

app.use("/api/v1/notes", notesRouter);
