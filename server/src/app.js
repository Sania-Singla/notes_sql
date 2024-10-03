import express from "express";
import cors from "cors";
export const app = express();

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (process.env.ORIGIN.includes(origin)) {
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    next();
});

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || process.env.ORIGIN.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { notesRouter } from "./routes/routes.js";

app.use("/api/v1/notes", notesRouter);
