import mysql from "mysql2";

export let pool;

export async function connect_db () {  // function is returning a response so should be an async function
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();   //.promise() is a method that will allow us to use async/await (learn from chatgpt)
}