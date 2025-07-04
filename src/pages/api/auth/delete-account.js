import connectDB from "@/src/lib/dbConnect";
import User from "@/src/models/users";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

  const { customUser } = parse(req.headers.cookie || "");
  if (!customUser) return res.status(401).json({ message: "Unauthorized" });

  await connectDB();
  const user = JSON.parse(customUser);

  try {
    await User.findByIdAndDelete(user.id);
    res.setHeader("Set-Cookie", `customUser=; Path=/; Max-Age=0`);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting account", error });
  }
}
