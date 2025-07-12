import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signOut } from "next-auth/react";
import { clearUser } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/authSlice";

export default function PremiumNavigation() {

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
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
    <>
     

      <nav className="fixed w-full z-50 backdrop-blur-md  bg-gray-500 border-b border-blue-500/20 shadow-2xl">
      
        <div className="relative flex justify-between lg:justify-around items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div
            onClick={()=>router.push("/")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 cursor-pointer">
              ROTECX
            </div>
            <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="sm:hidden text-blue-300 hover:text-blue-100 focus:outline-none transition-colors duration-300 p-2 rounded-lg hover:bg-blue-800/30"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            {/* home  */}
            <NavigationMenu>
              <NavigationMenuLink
                onClick={()=>router.push("/")}
              className="block cursor-pointer  py-2 text-sm text-slate-200  hover:text-blue-300   rounded-lg transition-all duration-300  relative group">
                <span className="relative z-10">Home</span>
              </NavigationMenuLink>
            </NavigationMenu>

            {/* Shop Menu */}
            {/* Reviews */}
            <NavigationMenu>
              <NavigationMenuLink
                onClick={()=>router.push("/shop")}
              className="block cursor-pointer py-2 text-sm text-slate-200  hover:text-blue-300   rounded-lg transition-all duration-300  relative group">
                <span className="relative z-10">Shop</span>
              </NavigationMenuLink>
            </NavigationMenu>

<NavigationMenu>
<NavigationMenuLink
                      onClick={()=>router.push("/custom-room")}
                    className="block cursor-pointer  py-3 text-sm text-slate-200   hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                      Custom Room
                    </NavigationMenuLink>
   </NavigationMenu>
             

            {/* About */}
            <NavigationMenu>
              <NavigationMenuLink 
                    onClick={()=>router.push("/about")}
              className="block cursor-pointer  py-2 text-sm text-slate-200 hover:text-blue-300 rounded-lg transition-all duration-300   relative group">
                <span className="relative z-10">About</span>
              </NavigationMenuLink>
            </NavigationMenu>

           
            {/* Reviews */}
            <NavigationMenu>
              <NavigationMenuLink
                onClick={()=>router.push("/customer/our-reviews")}
              className="block cursor-pointer  py-2 text-sm text-slate-200  hover:text-blue-300   rounded-lg transition-all duration-300  relative group">
                <span className="relative z-10">Reviews</span>
              </NavigationMenuLink>
            </NavigationMenu>

            {/* Certifications */}
            <NavigationMenu>
              <NavigationMenuLink
                onClick={()=>router.push("/cartification")}
              className="block cursor-pointer  py-2 text-sm text-slate-200  hover:text-blue-300   rounded-lg transition-all duration-300  relative group">
                <span className="relative z-10">Certifications</span>
              </NavigationMenuLink>
            </NavigationMenu>
          </div>

          {/* Auth/Login Buttons */}
          <div className="hidden sm:flex items-center gap-6 relative">
            {/* Cart */}
            <div className="relative group">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce border-2 border-slate-900">
                {totalItems}
              </div>
              <ShoppingCart
                onClick={() => router.push("/cart")}
                className="text-slate-200 hover:text-blue-300 w-6 h-6 cursor-pointer transition-all duration-300 group-hover:scale-110"
              />
            </div>

            {user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="!bg-transparent cursor-pointer p-0 border-none shadow-none hover:bg-transparent">
                      <div className="flex items-center gap-3 hover:bg-blue-800/30 rounded-lg p-2 transition-all duration-300">
                        <img
                          src={user?.image || "images/avatar.png"}
                          alt="User"
                          className="w-8 h-8 rounded-full border-2 border-blue-400/50"
                        />
                        <p className="text-sm text-slate-200">Hi, {user?.name || `${user?.firstName} ${user?.lastName}`}</p>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[140px] py-2 bg-slate-800/95 backdrop-blur-md border border-blue-500/20 rounded-xl shadow-2xl">
                      <NavigationMenuLink
                            onClick={() => router.push("/testdashboard")}
                      className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                        Dashboard
                      </NavigationMenuLink>
                      <NavigationMenuLink
                       onClick={() => router.push("/cart")}
                      className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                        My Cart
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2" onClick={handleLogout}>
                        Logout
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <button
                onClick={() => router.push("/authpage")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="sm:hidden bg-slate-800/95 backdrop-blur-md border-t border-blue-500/20 px-6 py-6 space-y-6">
            {/* Mobile menu content with dark theme */}
            <div className="space-y-4">
              <NavigationMenu>
                <NavigationMenuLink
                  onClick={()=>{router.push("/customer/our-reviews"), setMenuOpen(!menuOpen)}}
                className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:text-blue-300 rounded-lg transition-all duration-300">
                  Our Reviews
                </NavigationMenuLink>
              </NavigationMenu>

              <NavigationMenu>
               <NavigationMenuList>

                 
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent ml-4 cursor-pointer text-slate-200 hover:text-blue-300 p-0 border-none shadow-none hover:bg-transparent">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[180px] py-2 bg-slate-700/95 backdrop-blur-md border border-blue-500/20 rounded-xl">
                    <NavigationMenuLink
                             onClick={()=>{router.push("/shop"),setMenuOpen(!menuOpen)}}
                    className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                      Shop
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                      Shop Details
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                      Checkout
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                      Price Block
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                      </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuLink
                              onClick={()=>{router.push("/about"), setMenuOpen(!menuOpen)}}
                className="block cursor-pointer px-4 py-3 text-sm text-slate-200   hover:text-blue-300 rounded-lg transition-all duration-300">
                  About
                </NavigationMenuLink>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="!bg-transparent ml-4 cursor-pointer text-slate-200 hover:text-blue-300 p-0 border-none shadow-none hover:bg-transparent">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[180px] py-2 bg-slate-700/95 backdrop-blur-md border border-blue-500/20 rounded-xl">
                      <NavigationMenuLink
                        onClick={()=>{router.push("/custom-room"),setMenuOpen(!menuOpen)}}
                      className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                        Custom Room
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                        Certifications
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                        Our Reviews
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Auth Section */}
            <div className="flex items-center gap-4 pt-4 border-t border-blue-500/20">
              <div className="relative" 
              
              >
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </div>
                <ShoppingCart 
                    onClick={() => {router.push("/cart"),setMenuOpen(!menuOpen)}}
                className="text-slate-200 w-6 h-6 cursor-pointer" />
              </div>
              
              {user ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="!bg-transparent cursor-pointer p-0 border-none shadow-none hover:bg-transparent">
                        <div className="flex items-center gap-2">
                          <img
                            src={user?.image || "images/avatar.png"}
                            alt="User"
                            className="w-8 h-8 rounded-full border-2 border-blue-400/50"
                          />
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="min-w-[140px] py-2 bg-slate-700/95 backdrop-blur-md border border-blue-500/20 rounded-xl">
                        <NavigationMenuLink 
                              onClick={() => {router.push("/testdashboard"),setMenuOpen(!menuOpen)}}
                        className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                          Dashboard
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                         onClick={() => {router.push("/cart"),setMenuOpen(!menuOpen)}}
                        className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2">
                          My Cart
                        </NavigationMenuLink>
                        <NavigationMenuLink
                        
                        className="block cursor-pointer px-4 py-3 text-sm text-slate-200 hover:bg-blue-700/30 hover:text-blue-300 rounded-lg transition-all duration-300 mx-2" onClick={handleLogout}>
                          Logout
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <button
                onClick={() => {router.push("/authpage"),setMenuOpen(!menuOpen)}}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-300 flex-1"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}