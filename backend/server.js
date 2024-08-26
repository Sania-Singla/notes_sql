import dotenv from "dotenv";
dotenv.config();
import {app} from "./app.js";
import { connect_db } from "./database.js";

const PORT = process.env.PORT || 3000;

await connect_db();   //due to .promise() we can use async/await rather that .then()
app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));