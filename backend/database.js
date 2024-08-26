import mysql from "mysql2";

export let pool;

//⭐⭐so instead of connecting to the db everytime when querying we create a pool of all the connections similar to what we did in the db/connection file in tweettube (we got a object where .connection was a property)

export async function connect_db () {  // function is returning a response so should be an async function
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();   //.promise() is a method that will allow us to use async/await (learn from chatgpt)
}