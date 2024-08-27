import { connect_db } from "./database.js";
import { MysqlNotesClass } from "./notesClass.js";

export let object;

export async function main() {
    try {
        await connect_db();
        if(process.env.DATABASE_TYPE==='sql') object = new MysqlNotesClass();
        else throw new Error("undefined database type");
    } catch (err) {
        console.log(err);
    }
}