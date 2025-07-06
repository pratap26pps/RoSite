// PATCH method to update name, mobile, photo
import connectDB from "@/src/lib/dbConnect";
import User from "@/src/models/users";
 
export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });
 await connectDB();
 const formData = req.body;
 console.log("formData",formData)
 if(!formData){
  return res.status(401).json({ message: "Unauthorized" });
 }
  try {
   const updatedUser = await User.findOneAndUpdate(
      { email: formData.email },
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        image: formData.image,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
 
   


}
 
 