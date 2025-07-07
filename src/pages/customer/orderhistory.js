"use client";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function OrderHistory() {
  const { orders } = useSelector((state) => state.order);
console.log("orders",orders)
  // Create a ref map for dynamic refs
  const printRefs = useRef({});

  const handlePrint = useReactToPrint({
    content: () => {
      const selectedOrderId = handlePrint.orderId;
      return printRefs.current[selectedOrderId];
    },
  });

  const handlePrintClick = (orderId) => {
    handlePrint.orderId = orderId;
    handlePrint();
    toast.success("print")
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="shadow-md rounded-lg border bg-blue-100 border-gray-200"
            >
         <CardContent className="p-6 space-y-4">
  <div ref={(el) => (printRefs.current[order.id] = el)}>
    {/* Printable Content Starts Here */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="text-sm text-gray-600">
        <span className="font-semibold">Order ID: </span>
        {order.id}
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-semibold">Status: </span>
        <span className="text-green-600 font-medium">
          {order.status}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-semibold">Total: </span>₹
        {order.total}
      </div>
    </div>

    <div>
      <p className="font-semibold text-blue-700 mb-2">
        Ordered Products:
      </p>
      <div className="divide-y divide-gray-200">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-1 text-sm text-gray-800"
          >
            <div>
              <img className="h-20 w-20" src={item?.image} />
            </div>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Print Button */}
  <div className="text-right">
    <Button
      onClick={() => handlePrintClick(order.id)}
      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
    >
      Print Invoice
    </Button>
  </div>
</CardContent>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
