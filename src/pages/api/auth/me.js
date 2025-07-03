import { parse } from "cookie";

export default function handler(req, res) {
  const { customUser } = parse(req.headers.cookie || "");

  if (!customUser) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = JSON.parse(customUser);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ message: "Invalid cookie" });
  }
}
