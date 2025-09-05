import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
import User from "../model/Usermodel.js";

import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});
async function main() {
 
}


export async function AnswerTransactions(req, res) {
//   try {


//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     // Summarize last 20 transactions to avoid exceeding input limits


//     // Send request to Gemini with correct content array
//     const response = await model.generateContent({
//       content: [
//         {
//           type: "text",
//           text: finalPrompt
//         }
//       ]
//     });

//     // Safely extract AI reply
//     let aiReply = response.output_text;
//     if (!aiReply && response.response?.candidates?.length > 0) {
//       const candidate = response.response.candidates[0];
//       if (candidate?.content?.length > 0) {
//         aiReply = candidate.content.map(p => p.text).join("\n");
//       }
//     }

//     if (!aiReply) aiReply = "No response generated";

//     res.status(200).json({ success: aiReply });

//   } catch (error) {
//     console.error("AnswerTransactions error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
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
