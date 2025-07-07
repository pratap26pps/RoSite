"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "@/src/redux/slices/cartSlice";
import Image from "next/image";
 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
 
export default function CartPage() {

  const dispatch = useDispatch();
  const  product  = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
 
  const router= useRouter()
 
 


  const total = product.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkouthandler =()=>{
      if (!user) {
    toast.error("Please login to proceed to checkout");
    router.push("/login");
    return;
  }

  if (user.role === "admin") {
    toast.error("Oops! Admins cannot checkout.");
    return;
  }

  if (user.role !== "customer") {
    toast.error("Unauthorized access. Please login as customer.");
    router.push("/login");
  }
    router.push("/customer/billingorder")
  }

  const removehandler =(id)=>{
    dispatch(removeFromCart(id));
      toast.success("Product removed from cart");
  }
  return (
    <div className="min-h-screen bg-blue-50 py-25 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Your Cart</h2>

          {product.length === 0 ? (
           <div>
            <p className="text-gray-600">🛒 Your cart is empty.</p>
            <Button 
            className="mt-2 cursor-pointer"
              onClick={()=>router.push("/shop")}
            >Shop Now</Button>
           </div> 
          ) : (
            product.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md flex items-center p-4 mb-4"
              >
                <div className="w-24 h-24 relative mr-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    ₹{item.quantity * item.price}
                  </p>
                  <button
                    onClick={() =>removehandler(item.id)}
                    className="text-sm text-red-500 mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary */}
        <div className="bg-blue-100 rounded-xl shadow-md p-6 h-fit">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Summary</h3>
          <div className="flex text-blue-400 justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex text-blue-400 justify-between mb-2">
            <span>Tax (5%)</span>
            <span>₹{(total * 0.05).toFixed(0)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold text-blue-800">
            <span>Total</span>
            <span>₹{(total * 1.05).toFixed(0)}</span>
          </div>
          <button
          onClick={()=>checkouthandler()}
          className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
