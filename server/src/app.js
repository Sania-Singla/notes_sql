import express from 'express';
import cors from 'cors';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS
const whitelist = process.env.WHITELIST ? process.env.WHITELIST.split(',') : [];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whitelist.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        optionsSuccessStatus: 200,
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

import { notesRouter } from './routes/routes.js';

app.use('/api/v1/notes', notesRouter);
