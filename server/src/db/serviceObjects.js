import { MongodbNotesClass } from '../models/MongodbNotesModel.js';
import { MysqlNotesClass } from '../models/MYSQLNotesModel.js';

export default function getServiceObject(serviceType) {
    if (process.env.DATABASE_TYPE === 'sql') {
        switch (serviceType) {
            case 'notes':
                return new MysqlNotesClass();
            default:
                throw new Error('unsupported service type.');
        }
    } else if (process.env.DATABASE_TYPE === 'mongodb') {
        switch (serviceType) {
            case 'notes':
                return new MongodbNotesClass();
            default:
                throw new Error('unsupported service type.');
        }
    } else {
        throw new Error('unsupported database type for notes service.');
    }
}
