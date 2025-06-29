import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6 mt-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <p>Email: {session.user?.email}</p>
      <img
        src={session.user?.image}
        alt="User Profile"
        className="w-20 h-20 rounded-full mt-4"
      />
    </div>
  );
}
