import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

app.post("/sentiment", async (req, res) => {
  try {
    const { text } = req.body;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Analyze the audience sentiment of this movie plot and respond with:
          
          Sentiment: Positive / Mixed / Negative
          Summary: One sentence insight

          Plot: ${text}`
        }
      ]
    });

    res.json({
      result: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    res.json({
      result: "Sentiment analysis failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});