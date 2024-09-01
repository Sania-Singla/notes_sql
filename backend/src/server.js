import "./config/envLoader.js";
import { dbInstance } from "./db/dbConnection.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

export const connection = await dbInstance.connect();
app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
