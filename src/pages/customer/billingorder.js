"use client";

import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
 
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
    const searchParams = useSearchParams();
    const skuid = searchParams.get("skuid");
    const allProducts = useSelector((state) => state.product.products);
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
  
  // If skuid is present, find the product
  let singleProduct = null;
  if (skuid) {
    singleProduct = allProducts.find((p) => p.skuid === skuid);
  }

  // If skuid, use that product, else use cart
  const recentproduct = skuid && singleProduct ? [singleProduct] : cartItems;
const total = recentproduct?.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) || 0;

  const customConfigParam = searchParams.get("custom");
  const [customConfig, setCustomConfig] = useState(null);

  useEffect(() => {
    if (customConfigParam === "1") {
      const storedConfig = localStorage.getItem("custom-ro-config");
      if (storedConfig) {
        try {
          setCustomConfig(JSON.parse(storedConfig));
        } catch (e) {
          setCustomConfig(null);
        }
      }
    }
  }, [customConfigParam]);
console.log("customConfig",customConfig)
  // If custom config, use that for order summary and placement
  const isCustomOrder = !!customConfig;
  const customProducts = isCustomOrder ? Object.values(customConfig.selectedComponents || {}) : [];
  console.log("customproduct",customProducts)
  const customTotal = isCustomOrder ? customConfig.finalPrice : total;

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!country) newErrors.country = "Country is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!postalCode) newErrors.postalCode = "Postal code is required";
    if (!recentproduct || recentproduct.length === 0) newErrors.items = "No items to order";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkouthandler = async () => {
    if (!validate()) return;
    setIsPlacingOrder(true);
    try {
      const itemsToOrder = isCustomOrder
        ? customProducts.map((item) => ({
            product: item._id,
            quantity: 1,
            price: item.price,
          }))
        : recentproduct.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price,
          }));

      const res = await fetch("/api/customer/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user?._id || user?.id,
          items: itemsToOrder,
          totalAmount: isCustomOrder ? customTotal : total,
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod: "cod",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order placed successfully!");
        // Optionally redirect or clear cart
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const isFormValid = country && address && city && postalCode && recentproduct && recentproduct.length > 0;

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
                <Input placeholder="Full name" value={user?.name || user?.firstName  +  user?.lastName} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
              <div>
                <Label className="text-gray-700 pb-1">Email</Label>
                <Input placeholder="Email" value={user?.email || ""} readOnly className="bg-white border-gray-300 text-black" /> 
              </div>
             
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Country / Region *</Label>
                <Input placeholder="e.g., India" className="bg-white border-gray-300 text-black" value={country} onChange={e => setCountry(e.target.value)} />
                {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Street address *</Label>
                <Input placeholder="House number and street name" className="bg-white border-gray-300 text-black" value={address} onChange={e => setAddress(e.target.value)} />
                {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
              </div>
              <div className="sm:col-span-2 ">
                <Label className="text-gray-700 pb-1">Apartment, suite, etc. (optional)</Label>
                <Input placeholder="Apartment, suite, etc." className="bg-white border-gray-300 text-black" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">City *</Label>
                <Input placeholder="City" className="bg-white border-gray-300 text-black" value={city} onChange={e => setCity(e.target.value)} />
                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label className="text-gray-700 pb-1">Postal Code *</Label>
                <Input placeholder="Postal Code" className="bg-white border-gray-300 text-black" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                {errors.postalCode && <span className="text-red-500 text-xs">{errors.postalCode}</span>}
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
              {isCustomOrder ? (
                customProducts.map((item) => (
                  <div key={item._id} className="flex items-center justify-evenly mb-3 text-gray-700">
                    <img src={item?.images} alt={item?.name} className="w-16 h-16 object-cover rounded border border-gray-200" />
                   <div>
                    
                   <span className="flex-1 ml-4">{item.name} × 1</span>
                   <span className="font-semibold">₹{item.price }</span>
                    </div> 
                 

                  </div>
                ))
              ) : (
                recentproduct.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-3 text-gray-700">
                    <img src={item?.images} alt={item?.name} className="w-16 h-16 object-cover rounded border border-gray-200" />
                    <span className="flex-1 ml-4">{item.name} × {item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-blue-700">
                <span>Subtotal</span>
                <span>₹{isCustomOrder ? customTotal : total}</span>
              </div>
              {
                isCustomOrder && <div className="flex justify-between text-blue-700">
               <p>Installation Charges</p> <p>{customConfig?.installationPrice}</p>
              </div>
                
              }
              <div className="flex justify-between font-bold text-blue-800 text-lg mt-2">
                <span>Total</span>
                <span>₹{isCustomOrder ? customTotal : total}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <RadioGroup value="cod" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 opacity-50 pointer-events-none">
                <RadioGroupItem value="bank" disabled />
                <span className="flex items-center gap-2"><Banknote className="w-5 h-5 text-blue-600" /> Direct bank transfer</span>
              </div>
              <div className="flex items-center gap-2 opacity-50 pointer-events-none">
                <RadioGroupItem value="check" disabled />
                <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" /> Check payments</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cod" checked readOnly />
                <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-blue-600" /> Cash on delivery</span>
              </div>
            </RadioGroup>

            <Button 
               onClick={checkouthandler}
               disabled={isPlacingOrder || !isFormValid}
            className="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold rounded-xl shadow">
              {isPlacingOrder ? "Placing order..." : "Place order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

CheckoutPage.requiredRole = 'customer';
