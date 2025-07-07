"use client";
import { useState} from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/authSlice";
import { FaCartArrowDown } from "react-icons/fa";

export default function Navbar() {

  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    console.log("cartItems in nav ",cartItems?.length)
  const user = useSelector((state) => state.auth.user);
 const totalItems = cartItems?.length;
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
     await signOut({ redirect: false });
      dispatch(clearUser());
      setUser(null);
     router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <nav className="bg-blue-100 fixed w-full z-50 shadow">
      <div className="flex justify-between lg:justify-around items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          ROTECX
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="sm:hidden text-blue-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Shop Menu */}
          <NavigationMenu>
            <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-black hover:bg-blue-100 rounded transition" onClick={()=>router.push("/contact")}>contact</NavigationMenuLink>

          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="!bg-transparent cursor-pointer  text-black p-0 border-none shadow-none hover:bg-transparent">
                Shop
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[160px] py-2">
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition"  onClick={()=>router.push("/shop")}>Shop</NavigationMenuLink>
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/shopdetail")}>Shop Details</NavigationMenuLink>
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/Checkout")}>Checkout</NavigationMenuLink>
                <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/priceblock")}>Price Block</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm  text-black hover:bg-blue-100 rounded transition" onClick={()=>router.push("/about")}>About</NavigationMenuLink>

          </NavigationMenu>


          {/* Services Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent cursor-pointer  text-black p-0 border-none shadow-none hover:bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[160px] py-2">
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/custom-room")}>Custom Room</NavigationMenuLink>
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/certificates")}>Certifications</NavigationMenuLink>
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/review")}>Our Reviews</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth/Login Buttons */}
        <div className="hidden sm:flex items-center gap-4 relative">
               <p className="text-blue-900 rounded-full p-2  absolute ml-3">{totalItems}</p>

               <FaCartArrowDown
               onClick={()=>router.push("/cart")}
               className="text-black scale-150 mr-6 cursor-pointer"/>
          {user  ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent cursor-pointer text-black p-0 border-none shadow-none hover:bg-transparent">
                    <div className="flex items-center gap-2">
                      <img
                        src={user?.image || "images/avatar.png"}
                        alt="User"
                        className="w-7 h-7 rounded-full"
                      />
                      <p className="text-sm text-gray-500">Hi, {user?.name || `${user?.firstName} ${user?.lastName}`}</p>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[100px] py-2">
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/dashboard")}>Dashboard</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/cart")}>My Cart</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={handleLogout}>Logout</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-3 py-1 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
   
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="sm:hidden bg-blue-50 px-6 py-4 space-y-4">
          {/* Shop Section */}
       

          <div>
            <NavigationMenu>
              <NavigationMenuLink className="block cursor-pointer px-4 text-sm text-black hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/review")}>Our Reviews</NavigationMenuLink>

            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent ml-4 cursor-pointer text-black p-0 border-none shadow-none hover:bg-transparent">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[160px] py-2">
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/shop")}>Shop</NavigationMenuLink>
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/shopdetails")}>Shop Details</NavigationMenuLink>
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/Checkout")}>Checkout</NavigationMenuLink>
                  <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/priceblock")}>Price Block</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
          <NavigationMenu>
            <NavigationMenuLink className="block cursor-pointer px-4  text-sm text-black hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/about")}>About</NavigationMenuLink>

          </NavigationMenu>
          {/* Services Section */}
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent ml-4 cursor-pointer text-black p-0 border-none shadow-none hover:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[160px] py-2">
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/custum-room")}>Custom Room</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/certificates")}>Certifications</NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/reviews")}>Our Reviews</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* Auth Section */}
          <div className="flex gap-6">
             <FaCartArrowDown className="text-black scale-125 mt-2 ml-5"/>
            {user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="!bg-transparent cursor-pointer text-black p-0 border-none shadow-none hover:bg-transparent">
                      <div className="flex items-center gap-2">
                        <img
                          src={user?.image || "images/avatar.png"}
                          alt="User"
                          className="w-7 h-7 rounded-full"
                        />
                        {/* <p className="text-sm text-gray-500">Hi,{user?.name  || `${user?.firstName} ${user?.lastName}`}</p> */}
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[100px] py-2">
                      <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/dashboard")}>Dashboard</NavigationMenuLink>
                      <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={()=>router.push("/cart")}>My Cart</NavigationMenuLink>
                      <NavigationMenuLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded transition" onClick={handleLogout}>Logout</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 w-full"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
