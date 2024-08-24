import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js"

const PORT = process.env.PORT || 3000;

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();   //.promise() is a method that will allow us to use async/await (learn from chatgpt)


app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));