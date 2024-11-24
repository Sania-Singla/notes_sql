import { MongodbNotesClass } from '../models/MongodbNotesModel.js';
import { MysqlNotesClass } from '../models/MYSQLNotesModel.js';

export default function getServiceObject(serviceType) {
    switch (process.env.DATABASE_TYPE) {
        case 'SQL': {
            switch (serviceType) {
                case 'notes':
                    return new MysqlNotesClass();
                default:
                    throw new Error('unsupported service type.');
            }
        }
        case 'MongoDB': {
            switch (serviceType) {
                case 'notes':
                    return new MongodbNotesClass();
                default:
                    throw new Error('unsupported service type.');
            }
        }
        default: {
            throw new Error('unsupported database type.');
        }
    }
}
