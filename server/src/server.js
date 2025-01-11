import './config/envLoader.js';
import { dbInstance } from './db/connectDB.js';
import { app } from './app.js';

const PORT = process.env.PORT || 2500;

export const connection = await dbInstance.connect();

app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
