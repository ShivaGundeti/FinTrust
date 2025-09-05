import express from "express"
import dotenv from "dotenv";
import userroute from "./routes/userroute.js"
import Transaction from "./routes/Transaction.js"
import AiRoute from "./routes/Gemini.js"
import {connectDB} from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

import path from "path";
import { fileURLToPath } from "url";



const app = express()
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=><",__dirname)
// serve dist
const frontendPath = path.resolve(__dirname, "../Frontend/SmartBank/dist");
app.use(express.static(frontendPath));


const APP_DIR = "../Frontend/SmartBank/dist"
// app.get("/(.*)/", (req, res) => {
//   res.sendFile(path.j(frontendPath, "index.html"));
// });




app.use(cors({
  origin: "https://fintrust-3q8n.onrender.com",  // frontend origin
  credentials: true,                // allow cookies to be sent
}));
app.use(express.json()); 
app.use(cookieParser());
app.use('/auth',userroute)
app.use('/payment',Transaction)
app.use("/ai",AiRoute)



const port = process.env.PORT || 3000
app.get('*.*', express.static(path.join(__dirname, APP_DIR)));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, APP_DIR, 'index.html'))
})
connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("server running on port",port);
})
})
