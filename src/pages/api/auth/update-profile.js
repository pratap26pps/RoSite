// PATCH method to update name, mobile, photo
import connectDB from "@/src/lib/dbConnect";
import User from "@/src/models/users";
import { getServerSession } from "next-auth";
import NextAuth from "./[...nextauth]";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });
 await connectDB();
  const { customUser } = parse(req.headers.cookie || "");

  const session = await getServerSession(req, res, NextAuth);
 
  if (!session && !customUser)
    return res.status(401).json({ message: "Unauthorized" });



 
  const user = customUser ? JSON.parse(customUser) : session.user;
  
console.log("Incoming PATCH request body:", req.body);
console.log("User being updated:", user);
 

  try {
   const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        image: req.body.image,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
 
 