import express from "express";
export const app = express();
import { notesRouter } from "./routes/routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended:false }));  

app.use("/api/v1/notes",notesRouter);