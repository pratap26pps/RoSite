import connectDB from "@/src/lib/dbConnect";
import bcrypt from 'bcrypt';
import Otp from "@/src/models/Otp";
import users from "@/src/models/users";
import { signupSchema } from "@/src/lib/zodSchemas/userSchema";
import { serialize } from "cookie";
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

  const userdata=  await users.create({
      ...parsed.data,
      password: hashedPassword,
      image,
      role,
    });
    await Otp.deleteMany({ email });

     // Set cookie
    const cookie = serialize("customUser", JSON.stringify({
      id: userdata._id,
      email: userdata.email,
      name: userdata.firstName + " " + userdata.lastName,
      image: userdata.image || "/images/avatar.png",
      mobile: userdata.mobile,
      role: userdata.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  res.setHeader("Set-Cookie", cookie);  

    return res.status(200).json({ message: "Email verified successfully" ,data:userdata});
  }

  res.status(405).end("Method Not Allowed");
}
