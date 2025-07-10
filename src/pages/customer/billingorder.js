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
    <div className="min-h-screen relative py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4 border-l-4 border-blue-600 pl-3">
              Billing details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>first name </Label>
                <Input placeholder="full name" value={user?.name || ""} readOnly /> 
              </div>
              
              <div>
                <Label>Email</Label>
                <Input placeholder="email" value={user?.email || ""} readOnly /> 
              </div>
              
              <div className="sm:col-span-2">
                <Label>Company name (optional)</Label>
                <Input placeholder="Company" />
              </div>
              <div className="sm:col-span-2">
                <Label>Country / Region *</Label>
                <Input placeholder="e.g., India" />
              </div>
              <div className="sm:col-span-2">
                <Label>Street address *</Label>
                <Input placeholder="House number and street name" />
              </div>
              <div className="sm:col-span-2">
                <Label>Apartment, suite, etc. (optional)</Label>
                <Input placeholder="Apartment, suite, etc." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2 border-l-4 border-blue-600 pl-3">
              Your order
            </h2>
         <div className="bg-white border rounded p-4">
  <div className="flex justify-between font-semibold mb-2">
    <span>Image</span>
    <span>Product</span>
    <span>Subtotal</span>
  </div>

  {recentproduct?.length > 0 ? (
    recentproduct.map((item) => (
      <div key={item.id} className="flex justify-between mb-2 text-gray-700">
      <img src={item?.image} alt={item?.name} className="w-16 h-16 object-cover rounded" />


        <span>{item.name} × {item.quantity}</span>
        <span>₹{item.price * item.quantity}</span>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">No items in cart.</p>
  )}

  <hr className="my-2" />
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
            <RadioGroup defaultValue="bank" className="space-y-4">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="bank" />
                <div>
                  <span className="font-medium">Direct bank transfer</span>
                  <p className="text-sm mt-1 text-blue-600 bg-blue-100 p-2 rounded">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="check" />
                <span>Check payments</span>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="cod" />
                <span>Cash on delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="paypal" />
                <span>
                  PayPal
                  <img
                    src="/paypal-logos.png"
                    alt="paypal"
                    className="inline-block h-5 ml-2"
                  />
                </span>
              </div>
            </RadioGroup>

            <Button 
               onClick={checkouthandler}
            className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700">
              Place order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
