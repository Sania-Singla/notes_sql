create database if NOT EXISTS notes_app;
use notes_app;
create table IF NOT EXISTS notes (
    noteId char(36) PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

desc notes;