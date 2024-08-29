import { connect_db } from "./dbConnection.js";
import { MysqlNotesClass, MongodbNotesClass } from "../classes/notesClass.js"
export let object;

export async function main() {
    try {
        await connect_db();
        if(process.env.DATABASE_TYPE==='sql') object = new MysqlNotesClass();
        else if (process.env.DATABASE_TYPE==='mongodb') object = new MongodbNotesClass();
        else throw new Error("undefined database type");
    } catch (err) {
        console.log(err);
    }
}