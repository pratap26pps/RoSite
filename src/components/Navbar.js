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
  const router=useRouter();
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
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[200px] px-4 py-2">
              <NavigationMenuLink href="/dashboard">shop</NavigationMenuLink>
              <NavigationMenuLink>shop details</NavigationMenuLink>
              <NavigationMenuLink>cart</NavigationMenuLink>
              <NavigationMenuLink>checkout</NavigationMenuLink>
              <NavigationMenuLink>price block</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>services</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[200px] px-4 py-2">
              <NavigationMenuLink href="/custom-room">Custom Room</NavigationMenuLink>
              <NavigationMenuLink href="/custom-room">Certifications</NavigationMenuLink>
              <NavigationMenuLink href="/custom-room">Our Reviews</NavigationMenuLink>
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
            {session?.user && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <img
                  src={session?.user?.image}
                  alt="User Profile"
                  className="w-7 h-7 rounded-full mt-1"
                />
                <p className="text-sm text-gray-500">Hi, {session?.user?.name}</p>
              </Link>
            )}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[100px] px-4 py-2">

                    <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
                    <NavigationMenuLink href="/cart">My Cart</NavigationMenuLink>
                    <NavigationMenuLink onClick={() => signOut()}>Logout</NavigationMenuLink>
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
