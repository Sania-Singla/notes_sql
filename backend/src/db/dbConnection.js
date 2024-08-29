import mysql from "mysql2";
import mongoose from "mongoose";
export let pool;

//⭐⭐so instead of connecting to the db everytime when querying we create a pool of all the connections similar to what we did in the db/connection file in tweettube (we got a object where .connection was a property)

export async function connect_db () {  // function is returning a response so should be an async function
    try {
        if (process.env.DATABASE_TYPE === 'sql') 
        {
            pool = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
            }).promise();
 
            //becuase it is returning a promise so it wont throw error until tested via query or some other way like 👇
            // Test the connection
            const connection = await pool.getConnection();
            console.log("Connected to the sql database successfully. ");
            connection.release(); // Release the connection back to the pool
        } 
        else if (process.env.DATABASE_TYPE==="mongodb") 
        {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}${process.env.MONGODB_NAME}`);
            console.log(`Connected to the mongodb database successfully, host: ${connectionInstance.connection.host}`);
        }
        else 
        {
            throw new Error('Unsupported database type');
        }
    } 
    catch (err) {
        return console.log("db didn't connected !!", err);
    }
}