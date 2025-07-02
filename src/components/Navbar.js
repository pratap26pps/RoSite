import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";


export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log("Session Data:", session.user);
  return (
    <nav className="flex bg-blue-100 fixed w-full z-50 items-center justify-between px-6 py-3 top-0 shadow">
      {/* logo */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        ROTECX
      </Link>
      {/* Navigation Menu */}
      <div className="flex items-center gap-6">
        <NavigationMenu>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="!bg-transparent text-black p-0 border-none shadow-none hover:bg-transparent">Shop</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[160px] py-2">
              <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition">
                Shop
              </NavigationMenuLink>
              <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition">
                Shop Details
              </NavigationMenuLink>

              <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition">
                Checkout
              </NavigationMenuLink>
              <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition">
                Price Block
              </NavigationMenuLink>
            </NavigationMenuContent>

          </NavigationMenuItem>

        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="!bg-transparent text-black p-0 border-none shadow-none hover:bg-transparent">services</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[160px] py-2">
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" href="/custom-room">Custom Room</NavigationMenuLink>
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" href="/custom-room">Certifications</NavigationMenuLink>
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" href="/custom-room">Our Reviews</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* User Profile or Login Button */}
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="!bg-transparent text-black p-0 border-none shadow-none hover:bg-transparent">
                    {session?.user && (
                      <div className="flex items-center gap-2">
                        <img
                          src={session?.user?.image}
                          alt="User Profile"
                          className="w-7 h-7 rounded-full mt-1"
                        />
                        <p className="text-sm text-gray-500">Hi, {session?.user?.name}</p>
                      </div>
                    )}

                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[100px]  py-2">

                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" href="/dashboard">Dashboard</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" href="/cart">My Cart</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={() => signOut()}>Logout</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>

    </nav>
  );
}
