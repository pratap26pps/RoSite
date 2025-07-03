import connectDB from "@/src/lib/dbConnect";
 import users from "@/src/models/users";
import Otp from "@/src/models/Otp";
import { sendOTPEmail } from "@/src/lib/nodemailer";
import { signupSchema } from "@/src/lib/zodSchemas/userSchema";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const parsed = signupSchema.safeParse(req.body);
if (!parsed.success) {
  console.error("ZOD VALIDATION ERROR:", parsed.error.flatten());
  return res.status(400).json({ message: "Validation error", error: parsed.error });
}

    const { email } = parsed.data;

    const userExists = await users.findOne({ email });
    if (userExists) return res.status(409).json({ message: "User already exists" });



    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, code: otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    await sendOTPEmail(email,otp);

    return res.status(201).json({ message: "Otp Sent Successfully" });
  }

  return res.status(405).end("Method Not Allowed");
}
