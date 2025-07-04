"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      axios
        .get("/api/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    } else if (session?.user) {
      setUser(session.user);
    }
  }, [status, session]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      signOut();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleEditProfile = () => router.push("/ProfileUpdate");
  const handleUpdatePassword = () => router.push("/UpdatePassword");
  const handleDeleteAccount = () => router.push("/DeleteAccount");

  if (!user) return <p className="text-center py-20">Loading user...</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 text-center space-y-6">
        <img
          src={user.image || "/images/avatar.png"}
          alt="User Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleUpdatePassword}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition"
          >
            Update Password
          </button>

         

          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-black text-white py-2 px-4 rounded-md transition"
          >
            Logout
          </button>
           <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
