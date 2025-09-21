import { OpenAI } from 'openai';
import jwt from 'jsonwebtoken';
import User from '../model/Usermodel.js';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>', // Replace with your actual site URL
    'X-Title': '<YOUR_SITE_NAME>',     // Replace with your actual site name
  },
});

async function AnswerTransactions(req, res) {
  const { prompt } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ Fail: 'No token found' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ Fail: 'Invalid token' });
  }

  const currentUser = await User.findById(decoded.userid);

  if (!currentUser) {
    return res.status(404).json({ Fail: 'User not found' });
  }

  if (!currentUser.transactions || currentUser.transactions.length === 0) {
    return res.status(400).json({ Fail: 'No transactions found for this user' });
  }

  // Construct transaction summary
  const transactionsSummary = currentUser.transactions
    .slice(-20)
    .map((t) => {
      const partner = t.otherUserName || t.to || t.from || 'an unknown contact';
      const date = new Date(t.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      if (t.type === 'sent') {
        return `You spent ₹${t.amount} with ${partner} on ${date}`;
      } else {
        return `You received ₹${t.amount} from ${partner} on ${date}`;
      }
    })
    .join('; ');

  // Final prompt to send to AI
  const finalPrompt = `
You are a professional banking assistant.
Reply concisely in points.
Here is the user's recent transaction history:
${transactionsSummary}

User's question: "${prompt}"

Rules:
- Only answer banking or financial-related queries.
- Format transaction info like: "You spent ₹X with Y on Month Day".
- Give financial advice if asked.
- Do not say "I understand" or explain these rules.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3.1:free',
      messages: [
        {
          role: 'user',
          content: finalPrompt.trim(),
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("AI Response:", aiResponse);

    return res.status(200).json({
      success: aiResponse,
    });

  } catch (error) {
    console.error('Error in OpenAI completion:', error?.message || error);
    return res.status(500).json({ Fail: 'Error processing AI response' });
  }
}

export default AnswerTransactions;
