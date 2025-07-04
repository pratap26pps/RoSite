import connectDB from "@/src/lib/dbConnect";
import bcrypt from 'bcrypt';
import Otp from "@/src/models/Otp";
import users from "@/src/models/users";
import { signupSchema } from "@/src/lib/zodSchemas/userSchema";
export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { code, ...formData } = req.body;
    const parsed = signupSchema.safeParse(formData);
     if (!parsed.success) {
      return res.status(400).json({ message: "Validation error", error: parsed.error });
    }

    const { email, password } = parsed.data;

    const validOtp = await Otp.findOne({ email, code: code.toString() });

    if (!validOtp || validOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isFirstUser = (await users.countDocuments({})) === 0;
    const role = isFirstUser ? "admin" : "customer";
    const image = "/images/avatar.png";
    console.log("Data to insert:", {
  ...parsed.data,
  password: hashedPassword,
  image,
  role,
});

    await users.create({
      ...parsed.data,
      password: hashedPassword,
      image,
      role,
    });
    await Otp.deleteMany({ email });

    return res.status(200).json({ message: "Email verified successfully" });
  }

  res.status(405).end("Method Not Allowed");
}
