-- so we connected the sql using the database option in the nav menu and then can create the db and run all sql commands from here OR WE SHOULD USE WORKBENCH FOR CREATING DB and tables 
-- because it is a little complicated to create tables and db in express also in mern we created the db in atlas manually
create database if NOT EXISTS notes_app;
use notes_app;
create table if NOT EXISTS notes (
    _id varchar(40) PRIMARY KEY,
    -- due to mongodb
    title VARCHAR(256) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);