"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/authSlice";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

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
      setUser(null);
      dispatch(clearUser());


      return router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleEditProfile = () => router.push("/ProfileUpdate");
  const handleUpdatePassword = () => router.push("/UpdatePassword");
  const handleDeleteAccount = () => router.push("/DeleteAccount");

  if (!user) return <p className="text-center py-20">Loading user...</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row px-4 pb-5 pt-20">
      {/* Sidebar */}
      <div className="bg-white shadow-lg rounded-xl w-full md:w-1/3 p-6 mb-8 md:mb-0 md:mr-6 text-center space-y-6">
        <img
          src={user.image || "/images/avatar.png"}
          alt="User Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-xl font-bold text-blue-700">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
        </div>

        <div className="flex flex-col gap-3">
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

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-xl w-full md:w-2/3 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {user.role !== "admin" ? "Admin Actions" : "Your Dashboard"}
        </h2>

        {user.role !== "admin" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Add Category/Product
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Product History
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Customer Management
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Order Overview
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              My Cart
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Order History
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Wishlist
            </button>
            <button className="py-3 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md">
              Track Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
