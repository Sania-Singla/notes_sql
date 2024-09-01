import { MysqlNotesClass, MongodbNotesClass } from "../classes/notesClass.js";

export default function getServiceObject(serviceType) {
    if (serviceType) {
        switch (serviceType) {
            case "notes":
                if (process.env.DATABASE_TYPE === "sql")
                    return new MysqlNotesClass();
                else if (process.env.DATABASE_TYPE === "mongodb")
                    return new MongodbNotesClass();
                else
                    throw new Error(
                        "unsupported database type for notes service."
                    );

            // all other cases

            default:
                throw new Error("unsupported service type.");
        }
    }
}
