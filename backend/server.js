import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert Pharmacy AI tutor.
You answer ONLY pharmacy-related questions.
Follow Indian pharmacy syllabus (PCI, GPAT, NIPER).
Explain clearly, accurately, and student-friendly.
`
        },
        { role: "user", content: userMessage }
      ],
      temperature: 0.4
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      reply: "AI server error. Please try again."
    });
  }
});

app.listen(5000, () => {
  console.log("Pharma AI Server running on http://localhost:5000");
});
