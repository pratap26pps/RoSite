import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}
