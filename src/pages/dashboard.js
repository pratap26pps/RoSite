import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      axios.get("/api/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    } else if (session?.user) {
      setUser(session.user);
    }
  }, [status, session]);

  if (!user) return <p className="text-center py-20">Loading user...</p>;

const handleLogout = async () => {
  try {
      await axios.get("/api/auth/logout");
    if (session) {
      signOut();
    } else {
    return  router.push("/");
    }
  } catch (error) {
    console.error("Logout error", error);
  }
};

  return (
    <div className="p-6 py-20 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
     
        <img src={user.image || "images/avatar.png"} alt="User Profile" className="w-20 h-20 rounded-full mt-4" />
      
      <button onClick={handleLogout} className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md mt-6">
  Logout
</button>
    </div>
  );
}
