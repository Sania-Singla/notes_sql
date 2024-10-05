import mysql from "mysql2";
import mongoose from "mongoose";

class DBconnection {
    constructor() {
        this.connection = null; // just creates a property named connection
    }

    static getInstance() {
        if (!DBconnection.instance) {
            DBconnection.instance = new DBconnection();
        }
        return DBconnection.instance;
    }

    async connect() {
        try {
            if (!this.connection) {
                if (process.env.DATABASE_TYPE === "sql") {
                    // this.connection = mysql
                    //     .createPool({
                    //         host: process.env.MYSQL_HOST,
                    //         user: process.env.MYSQL_USER,
                    //         password: process.env.MYSQL_PASSWORD,
                    //         database: process.env.MYSQL_DATABASE_NAME,
                    //     })
                    //     .promise();
                    this.connection = mysql
                        .createPool({
                            host: process.env.MYSQL_CLOUD_HOST,
                            user: process.env.MYSQL_CLOUD_USER,
                            password: process.env.MYSQL_CLOUD_PASSWORD,
                            database: process.env.MYSQL_CLOUD_DATABASE_NAME,
                        })
                        .promise();

                    // Test the connection becuase it is returning a promise so it wont throw error until tested explictly 👇
                    const connection = await this.connection.getConnection();
                    console.log(`Connected to the sql database successfully, host: ${connection.config.host}`);
                    // Release the connection
                    connection.release();
                } else if (process.env.DATABASE_TYPE === "mongodb") {
                    this.connection = await mongoose.connect(`${process.env.MONGODB_URL}${process.env.MONGODB_DB_NAME}`);
                    console.log(`Connected to the mongodb database successfully, host: ${this.connection.connection.host}`);
                } else {
                    throw new Error("Unsupported database type");
                }
            }
        } catch (err) {
            return console.log("db didn't connected !!", err);
        }
        return this.connection;
    }
}

export const dbInstance = DBconnection.getInstance(); // although it was static but can access using className
