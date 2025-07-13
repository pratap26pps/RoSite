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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function CustomerManagement() {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Pankaj Singh",
      email: "pankaj@example.com",
      mobile: "9876543210",
      isBlocked: false,
      role: "customer",
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
      role: "customer",
      orders: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const toggleBlockStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isBlocked: !c.isBlocked } : c
      )
    );
  };

  const handleRoleChange = (id, newRole) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, role: newRole } : c
      )
    );
  };

  // Filter customers by name (case-insensitive, partial match)
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 py-10 px-2 sm:px-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold text-blue-700 dark:text-cyan-300 mb-8 text-center tracking-tight">Customer Management</h2>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6">
        <Input
          type="text"
          placeholder="Search by user name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full max-w-xs border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-700 dark:to-blue-800 text-white font-semibold shadow hover:from-blue-600 hover:to-cyan-600">Search</Button>
      </form>
      <div className="overflow-x-auto max-w-7xl mx-auto border border-blue-100 dark:border-gray-800 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-gray-800 text-black dark:text-cyan-200">
              <TableHead className="text-blue-900 dark:text-cyan-200">Name</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Email</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Mobile</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Status</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200">Role</TableHead>
              <TableHead className="text-blue-900 dark:text-cyan-200 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                <TableCell className="font-semibold">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${customer?.isBlocked ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"}`}
                  >
                    {customer?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    value={customer.role}
                    onValueChange={(val) => handleRoleChange(customer.id, val)}
                  >
                    <SelectTrigger className="w-32 border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-blue-200 dark:border-gray-700">
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="microadmin">Microadmin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-700 dark:border-cyan-400 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-gray-800">View Orders</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-xl shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-blue-700 dark:text-cyan-300">{customer.name}'s Order History</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {customer?.orders?.length === 0 ? (
                          <p className="text-gray-500 dark:text-gray-300">No orders yet.</p>
                        ) : (
                          customer?.orders?.map((order) => (
                            <div key={order?.id} className="border border-blue-100 dark:border-gray-700 p-2 rounded-md bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-cyan-200">
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
                    className={customer.isBlocked ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"}
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
