// PATCH method to update name, mobile, photo
import connectDB from "@/src/lib/dbConnect";
import User from "@/src/models/users";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });

  const { customUser } = parse(req.headers.cookie || "");
  if (!customUser) return res.status(401).json({ message: "Unauthorized" });

  const user = JSON.parse(customUser);
  await connectDB();

  const { firstName, lastName, mobile, image } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { firstName, lastName, mobile, image },
      { new: true }
    );

    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
