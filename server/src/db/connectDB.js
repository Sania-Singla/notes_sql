import mysql from 'mysql2';
import mongoose from 'mongoose';

class DBconnection {
    constructor() {
        this.connection = null;
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
                switch (process.env.DATABASE_TYPE) {
                    case 'sql': {
                        await this.connectToMYSQL();
                        break;
                    }
                    case 'mongodb': {
                        await this.connectToMongoDB();
                        break;
                    }
                    default: {
                        throw new Error('Unsupported database type');
                    }
                }
            }
            return this.connection;
        } catch (err) {
            return console.log("db didn't connected !!", err);
        }
    }

    async connectToMYSQL() {
        try {
            this.connection = mysql
                .createPool({
                    host: process.env.MYSQL_HOST,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE_NAME,
                })
                .promise();

            // Test the connection becuase it is returning a promise so it wont throw error until tested explictly 👇
            const conn = await this.connection.getConnection();
            console.log(
                `Connected to mysql successfully, host: ${conn.config.host}`
            );
            conn.release();
        } catch (err) {
            return console.log("mysql didn't connected !!", err);
        }
    }

    async connectToMongoDB() {
        try {
            this.connection = await mongoose.connect(
                `${process.env.MONGODB_URL}${process.env.MONGODB_DB_NAME}`
            );

            console.log(
                `Connected to mongodb successfully, host: ${this.connection.connection.host}`
            );
        } catch (err) {
            return console.log("mongodb didn't connected !!", err);
        }
    }
}

export const dbInstance = DBconnection.getInstance(); // although it was static but can access using className
