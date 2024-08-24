import express from "express";
const app = express();
import { notesRouter } from "./routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended:false }));  

app.use("/api/v1/notes",notesRouter);

export default app;