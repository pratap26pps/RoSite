"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUser } from "../redux/slices/authSlice";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user2, setUser2] = useState(null);
    const user = useSelector((state) => state.auth.user);
    console.log("User in Dashboard:", user);
    console.log("User2 in Dashboard:", user2);
  const router = useRouter();
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      axios
        .get("/api/auth/me")
        .then((res) => setUser2(res.data.user))
        .catch(() => setUser2(null));
    } else if (session?.user) {
      setUser2(session.user);
       dispatch(setUser(session.user));
    }
    
  }, [status, session, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      await signOut({ redirect: false });
      setUser2(null);
      dispatch(clearUser());
      router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };


  const handleEditProfile = () => router.push("/ProfileUpdate");
  const handleUpdatePassword = () => router.push("/UpdatePassword");
  const handleDeleteAccount = () => router.push("/DeleteAccount");

 if (!user2)
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100  relative">
      <div className="loader"></div>
    </div>
  );


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row px-4 pb-5 pt-20">
      {/* Sidebar */}
      <div className="bg-white shadow-lg rounded-xl w-full md:w-1/3 p-6 mb-8 md:mb-0 md:mr-6 text-center space-y-6">
        <img
          src={user?.image || user2?.image || "/images/avatar.png"}
          alt="User Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-xl font-bold text-blue-700">{user?.name || user2?.name}</h1>
          <p className="text-gray-600">{user?.email  || user2?.email }</p>
         <p className="text-sm text-gray-500 capitalize">Role: {user?.role ||user2?.role}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleEditProfile}
            classNam 
          >
            Edit Profile
          </Button>

          <Button
            onClick={handleUpdatePassword}
            classNam 
          >
            Update Password
          </Button>

          <Button
            onClick={handleLogout}
            classNam 
          >
            Logout
          </Button>

          <Button
            onClick={handleDeleteAccount}
            classNam 
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-xl w-full md:w-2/3 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {(user?.role || user2?.role) === "admin" ? "Admin Actions" : "Your Dashboard"}
        </h2>

        {(user?.role ||user2?.role )=== "admin" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button >
              Add Category/Product
            </Button>
            <Button >
              Product History
            </Button>
            <Button >
              Customer Management
            </Button>
            <Button >
              Order Overview
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button >
              My Cart
            </Button>
            <Button >
              Order History
            </Button>
            <Button >
              Wishlist
            </Button>
            <Button >
              Track Orders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
