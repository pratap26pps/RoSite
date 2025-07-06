"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
 
import AdminDashboard from "./admin/dashboard";
export default function Dashboard() {
 
 
    const user = useSelector((state) => state.auth.user);
    console.log("User in Dashboard:", user);
     const router = useRouter();
 

  const handleEditProfile = () => router.push("/ProfileUpdate");
  const handleUpdatePassword = () => router.push("/UpdatePassword");
  const handleDeleteAccount = () => router.push("/DeleteAccount");
  
   
 if (!user)
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100  relative">
      <div className="loader"></div>
    </div>
  );


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row px-4 pb-5 pt-20">
      {/* Sidebar */}
      <div className="bg-blue-200 shadow-lg rounded-xl w-full md:w-1/3 p-6 mb-8 md:mb-0 md:mr-6 text-center space-y-6">
        <img
          src={user?.image   || "/images/avatar.png"}
          alt="User Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-xl font-bold text-blue-700">{user?.name  ||`${user?.firstName} ${user?.lastName}`}</h1>
          <p className="text-gray-600">{user?.email   }</p>
         <p className="text-sm text-gray-500 capitalize">Role: {user?.role  }</p>
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
            onClick={handleDeleteAccount}
            classNam 
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-blue-200 shadow-lg rounded-xl w-full md:w-2/3 p-8 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {user?.role   === "admin" ? "Admin Actions" : "Your Dashboard"}
        </h2>

        { user?.role=== "admin" ? (
          <div>
            <AdminDashboard/>
           <div className="grid grid-cols-1 lg:-mt-54 sm:grid-cols-2 gap-4">
            <Button
            className="cursor-pointer"
             onClick={()=>router.push("/admin/products/add-product")}>
              Add Category/Product
            </Button>
            <Button
             className="cursor-pointer"
             onClick={()=>router.push("/admin/products/productlist")}>
              Product History
            </Button>
            <Button 
             className="cursor-pointer"
                 onClick={()=>router.push("/admin/userlist")}
            >
              Customer Management
            </Button>
            <Button 
             className="cursor-pointer"
               onClick={()=>router.push("/admin/order/orderlist")}
            >
              Order Management
            </Button>
          </div>
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
