"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";

export default function CustomerManagement() {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Pankaj Singh",
      email: "pankaj@example.com",
      mobile: "9876543210",
      isBlocked: false,
      orders: [
        { id: "ord1", date: "2025-07-01", total: "₹1,200" },
        { id: "ord2", date: "2025-07-03", total: "₹799" },
      ],
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      mobile: "9898989898",
      isBlocked: true,
      orders: [],
    },
  ]);

  // const user = useSelector((state) => state.auth.user);

  const toggleBlockStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isBlocked: !c.isBlocked } : c
      )
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br  bg-blue-50 py-20 text-gray-800">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Customer Management</h2>

      <div className="overflow-x-auto max-w-7xl mx-auto border rounded-lg shadow bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 text-black">
              <TableHead className="text-black" >Name</TableHead>
              <TableHead className="text-black" >Email</TableHead>
              <TableHead className="text-black" >Mobile</TableHead>
              <TableHead className="text-black" >Status</TableHead>
              <TableHead className="text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${customer?.isBlocked ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
                      }`}
                  >
                    {customer?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-white">View Orders</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{customer.name}'s Order History</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {customer?.orders?.length === 0 ? (
                          <p className="text-gray-500">No orders yet.</p>
                        ) : (
                          customer?.orders?.map((order) => (
                            <div key={order?.id} className="border p-2 rounded-md bg-gray-50 text-black">
                              <p><strong>ID:</strong> {order?.id}</p>
                              <p><strong>Date:</strong> {order?.date}</p>
                              <p><strong>Total:</strong> {order?.total}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant={customer.isBlocked ? "default" : "destructive"}
                    onClick={() => toggleBlockStatus(customer.id)}
                  >
                    {customer.isBlocked ? "Unblock" : "Block"}
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
