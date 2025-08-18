import express from "express"
import dotenv from "dotenv";
import userroute from "./routes/userroute.js"
import Transaction from "./routes/Transaction.js"
import {connectDB} from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import {GoogleGenerativeAI} from "@google/generative-ai"
import jwt from "jsonwebtoken"
import User from "./model/Usermodel.js";
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
  origin: "",  // frontend origin
  credentials: true,                // allow cookies to be sent
}));
app.use(express.json()); 
app.use(cookieParser());
app.use('/auth',userroute)
app.use('/payment',Transaction)
app.post("/ai",async (req,res)=>{
  try {
    const {prompt} = req.body;
    const token = req.cookies.token;
    if(!token){
      res.status(401).json({Fail:"No token found"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    const currentUser = await User.findById(decoded.userid);

    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});
    const instructions = `
You are a professional bank manager AI assistant. 
Your role is to answer user queries related to their banking transactions in a concise and professional way.
and when asked about transaction reply in points not as paragraphs and also study he/her transactions and when asked an advice
or ask how to save or earn or maintain sufficient or anything else give him a proper plan on how he can reach a particular goal or earn a certain amount or send him limits on over expenditure or over spent and change plan for goals okay 
Context:
- Transactions: ${JSON.stringify(currentUser.transactions)}
- User's question: "${prompt}"

Rules:
1. If the user sends greetings like "hi", "hello", "hey" → reply politely with "Hello! How can I assist you with your banking today?" 
2. If the user asks about transactions, balance, deductions, or money → check the provided transactions and answer in the following strict format:
   - Sent: "You spent ₹{amount} with {person name} on {Month Day} on {description}"
   - Received: "You received ₹{amount} from {person name} on {Month Day}"
3. All amounts must be in Indian Rupees (₹).
4. All dates must be in "Month Day" format (e.g., Aug 15).
5. Do NOT provide explanations, extra sentences, or disclaimers.
6. If no relevant transaction is found → reply: "No matching transaction found."
7. If the query is not related to banking → reply: "I can only assist with banking-related queries."
8. Always keep responses short, accurate, and professional.
9. If asked for total sum of either sent transactions or received transactions just calculate the total transaction respectively
`;

    const result = await model.generateContent(instructions)
    const aiReply = result.response.candidates[0].content.parts[0].text;
      res.status(200).json({success: aiReply})
    
  } catch (error) {
    console.log(error.message);
    
  }
})

const port = process.env.PORT || 3000
app.get('*.*', express.static(path.join(__dirname, APP_DIR)));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, APP_DIR, 'index.html'))
})
connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("server running");
})
})
