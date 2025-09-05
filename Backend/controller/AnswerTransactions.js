import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
import User from "../model/Usermodel.js";
import dotenv from "dotenv"
dotenv.config()
import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", 
    "X-Title": "<YOUR_SITE_NAME>",
  },
});



export async function AnswerTransactions(req, res) {

    const { prompt } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ Fail: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.userid);

    if (!currentUser) {
      return res.status(404).json({ Fail: "User not found" });
    }
        const transactionsSummary = currentUser.transactions
      .slice(-20)
      .map(t => {
        if (t.type === "sent") {
          return `You spent ₹${t.amount} with ${t.name || t.to || "unknown"} on ${t.date}`;
        } else {
          return `You received ₹${t.amount} from ${t.name || t.from || "unknown"} on ${t.date}`;
        }
      })
      .join("; ");

    // Prepare prompt with instructions + user question
    const finalPrompt = `
You are a professional bank assistant. 
Reply concisely in points.
Transactions summary: ${currentUser.transactions}
User question: "${prompt}"
Rules:
- Only answer banking-related queries.
- For transactions, reply like "You spent ₹X with Y on Month Day".
- Give financial advice if asked.
- Never say "I understand" or explain rules.
`;
   const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free",
    messages: [
      {
        "role": "user",
        "content": finalPrompt
      }
    ],
    
  });
  res.status(200).json({success:completion.choices[0].message})

}
