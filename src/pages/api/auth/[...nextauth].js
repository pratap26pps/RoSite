import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import users from "../../../models/users";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, profile }) {
      try {
        await dbConnect();
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          await users.create({
            firstName: profile.given_name || user.name?.split(" ")[0] || "",
            lastName: profile.family_name || user.name?.split(" ")[1] || "",
            email: user.email,
            image: user.image,
            mobile: "",
            password: "",  
            role: "customer",
          });
        }

        return true;
      } catch (error) {
        console.error("Error saving user to DB", error);
        return false;
      }
    },

     async session({ session }) {
      const dbUser = await users.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.role = dbUser.role;
        session.user.mobile = dbUser.mobile;
        session.user.name = `${dbUser.firstName} ${dbUser.lastName}`;
        session.user.image = dbUser.image;
      }
      return session;
    }

  },

 
});
