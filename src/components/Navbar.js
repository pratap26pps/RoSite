import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex fixed w-full  items-center justify-between px-6 top-4 shadow">
      <Link href="/" className="text-xl font-bold text-blue-600">
        RO TECHNICAL XPERTS
      </Link>

      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
           {session?.user && (
              <p className="text-sm text-gray-700">Hi, {session?.user?.name}</p>
            )}
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
