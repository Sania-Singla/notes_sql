import dotenv from "dotenv";
dotenv.config({path:"./src/config/.env"});
import {app} from "./app.js";
import { main } from "./db/main.js";
const PORT = process.env.PORT || 3000;

await main(); 
app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));