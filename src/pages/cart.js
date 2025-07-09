"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartIcon,
  TrashIcon,
  HeartIcon,
  CreditCardIcon,
  BoltIcon,
  ShieldCheckIcon,
  TruckIcon,
  GiftIcon,
  MoonIcon,
  SunIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeFromCart } from "../redux/slices/cartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const [isDark, setIsDark] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const router = useRouter();

  const theme = isDark
    ? {
        bg: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
        card: "bg-gray-900 text-white",
        text: "text-white",
        accent: "text-blue-400",
      }
    : {
        bg: "bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-100",
        card: "bg-white text-black",
        text: "text-black",
        accent: "text-blue-600",
      };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      router.push("/authpage");
      return;
    }

    if (user.role !== "customer") {
      toast.error("Only customers can checkout");
     
      return;
    }

    router.push("/customer/billingorder");
  };

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 10 });
      toast.success("Promo code applied! 10% off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} pt-20 px-4`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 rounded-xl backdrop-blur-md bg-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              <p className="text-white/80">{cartItems.length} items in your cart</p>
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-1 relative lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-xl shadow-xl p-6 ${theme.card}`}>
              <h3 className="text-xl font-semibold mb-6">Your Items</h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 opacity-70">Your cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg shadow-sm hover:scale-[1.01] transition-transform duration-300 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-400">Category: {item.category}</p>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${theme.accent}`}>${item.price.toFixed(2)}</span>
                        {item.originalPrice > item.price && (
                          <span className="line-through text-sm text-gray-400">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.quantity > 1 && toast("Update logic pending")}
                        className="bg-gray-600 p-1 rounded"
                      >
                        <MinusIcon className="h-4 w-4 text-white" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => toast("Update logic pending")}
                        className="bg-gray-600 p-1 rounded"
                      >
                        <PlusIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button>
                        <HeartIcon className="h-5 w-5 text-pink-500" />
                      </button>
                      <button onClick={() => handleRemove(item.id)}>
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Promo */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <GiftIcon className="h-5 w-5 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 p-2 rounded border border-gray-300"
                  />
                  <button
                    onClick={handlePromoApply}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-green-400 text-sm">
                    Promo Applied: {appliedPromo.code} - {appliedPromo.discount}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className={`rounded-xl shadow-xl p-6 ${theme.card}`}>
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>You saved</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className={theme.accent}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded flex justify-center items-center gap-2"
              >
                <CreditCardIcon className="h-5 w-5" />
                Proceed to Checkout
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-3 rounded flex justify-center items-center gap-2">
                <BoltIcon className="h-5 w-5" />
                Express Checkout
              </button>
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                Secure 256-bit SSL encryption
              </div>
              <div className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-blue-400" />
                Free shipping on orders over $100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
          <div className={`p-6 rounded-xl max-w-md w-full ${theme.card}`}>
            <h2 className="text-xl font-bold mb-3">Confirm Checkout</h2>
            <p className="text-sm text-gray-400 mb-6">
              You’ll be redirected to the secure payment page.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success("Redirecting...");
                  setIsCheckoutOpen(false);
                  handleCheckout();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
