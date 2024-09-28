import { MysqlNotesClass, MongodbNotesClass } from "../models/notesModel.js"

export default function getServiceObject(serviceType) {
    if (process.env.DATABASE_TYPE === "sql") {
        switch (serviceType) {
            case "notes":
                return new MysqlNotesClass()

            // all other cases

            default:
                throw new Error("unsupported service type.")
        }
    } else if (process.env.DATABASE_TYPE === "mongodb") {
        switch (serviceType) {
            case "notes":
                return new MongodbNotesClass()

            // all other cases

            default:
                throw new Error("unsupported service type.")
        }
    } else {
        throw new Error("unsupported database type for notes service.")
    }
}
