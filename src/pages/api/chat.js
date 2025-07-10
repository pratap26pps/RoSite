import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
   const completion = await openai.chat.completions.create({
  model: "llama3-70b-8192", // or "mixtral-8x7b-32768"
  messages: [
    {
      role: "system",
      content: `You are AquaBot, a helpful assistant for RO water purification systems. Speak in a polite, clear tone, and guide users step by step. Avoid technical jargon unless needed. 
      Your job is to help users understand product features, troubleshoot issues, give maintenance tips, and recommend suitable filters based on needs. 
      Use simple and friendly language. Always ask clarifying questions if the user's query is unclear.`,
    },
    {
      role: "user",
      content: message,
    },
  ],
});


    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
     console.error("OpenAI API error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}
