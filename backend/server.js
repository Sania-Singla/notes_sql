import dotenv from "dotenv";
dotenv.config();
import {app} from "./app.js";
import { main } from "./main.js";
const PORT = process.env.PORT || 3000;

await main(); 
app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));