// PATCH method to update name, mobile, photo
import connectDB from "@/src/lib/dbConnect";
import User from "@/src/models/users";
 
export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });
 await connectDB();
 const profileForm = req.body;
 console.log("profileForm",profileForm)
 if(!profileForm){
  return res.status(401).json({ message: "Unauthorized" });
 }
  try {
   const updatedUser = await User.findOneAndUpdate(
      { email: profileForm.email },
      {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        mobile: profileForm.mobile,
        image: profileForm.image,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
 
   


}
 
 