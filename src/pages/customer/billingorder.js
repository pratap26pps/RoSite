"use client";

import { useEffect,useState } from "react";
 
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { placeOrder } from "@/src/redux/slices/orderSlice";
import { useDispatch } from "react-redux";
import { CreditCard, Banknote, Wallet } from "lucide-react";

export default function CheckoutPage() {

    const user = useSelector((state) => state.auth.user);
    const { cartItems } = useSelector((state) => state.cart);
    console.log("User in billingorder:", user);
    console.log("cartItems in billingorder ",cartItems)
 
    const [product, setProduct] = useState(null);
     const dispatch = useDispatch();

    useEffect(() => {
    const storedProduct = localStorage.getItem("specific-product");
    if (storedProduct) {
      try {
        const parsed = JSON.parse(storedProduct);
        setProduct(parsed);
      } catch (error) {
        console.error("Failed to parse localStorage product:", error);
      }
    }
  }, []);
  
  const recentproduct = cartItems || product;
const total = recentproduct?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const checkouthandler =(id)=>{
 if (!recentproduct || recentproduct.length === 0) {
    toast.error("No items to place an order.");
    return;
  }

  dispatch(
    placeOrder({
      items: recentproduct,
      total: total * 1.05,
    })
  );
  toast.success("Order placed successfully!");
 
  }


  return (
    <div className="min-h-screen bg-white relative py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-600 pl-3">
              Billing details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700">First Name</Label>
                <Input placeholder="Full name" value={user?.name || ""} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
              <div>
                <Label className="text-gray-700">Email</Label>
                <Input placeholder="Email" value={user?.email || ""} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700">Company name (optional)</Label>
                <Input placeholder="Company" className="bg-white border-gray-300 text-black" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700">Country / Region *</Label>
                <Input placeholder="e.g., India" className="bg-white border-gray-300 text-black" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700">Street address *</Label>
                <Input placeholder="House number and street name" className="bg-white border-gray-300 text-black" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700">Apartment, suite, etc. (optional)</Label>
                <Input placeholder="Apartment, suite, etc." className="bg-white border-gray-300 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Your order
            </h2>
            <div className="bg-white border rounded-xl p-6">
              <div className="flex justify-between font-semibold mb-4 text-gray-700">
                <span>Image</span>
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {recentproduct?.length > 0 ? (
                recentproduct.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-3 text-gray-700">
                    <img src={item?.image} alt={item?.name} className="w-16 h-16 object-cover rounded border border-gray-200" />
                    <span className="flex-1 ml-4">{item.name} × {item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items in cart.</p>
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-blue-700">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-800 text-lg mt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <RadioGroup defaultValue="bank" className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="bank" />
                <div>
                  <span className="font-medium flex items-center gap-2"><Banknote className="w-5 h-5 text-blue-600" /> Direct bank transfer</span>
                  <p className="text-sm mt-1 text-blue-600 bg-blue-100 p-2 rounded">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="check" />
                <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" /> Check payments</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cod" />
                <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-blue-600" /> Cash on delivery</span>
              </div>
            
            </RadioGroup>

            <Button 
               onClick={checkouthandler}
            className="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold rounded-xl shadow">
              Place order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
