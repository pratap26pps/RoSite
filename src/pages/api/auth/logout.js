export default function handler(req, res) {
  
  res.setHeader("Set-Cookie", "customUser=; path=/; max-age=0");
  return res.status(200).json({ message: "Logged out" });
}
