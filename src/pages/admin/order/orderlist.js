"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

const statusOptions = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
];

export default function OrderManagement() {
    const [statusFilter, setStatusFilter] = useState("");
    const [orders, setOrders] = useState([
        {
            id: "ORD001",
            customer: { name: "Pankaj Singh", email: "pankaj@example.com" },
            products: [
                { name: "RO Filter", quantity: 2, price: 2500 },
                { name: "Water Tank", quantity: 1, price: 1500 },
            ],
            codAmount: 6500,
            status: "Pending",
            isCODCollected: false,
        },
        {
            id: "ORD002",
            customer: { name: "Ravi Kumar", email: "ravi@example.com" },
            products: [
                { name: "Pipe Set", quantity: 3, price: 500 },
            ],
            codAmount: 1500,
            status: "Confirmed",
            isCODCollected: true,
        },
    ]);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const markCODCollected = (orderId) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, isCODCollected: true } : order
            )
        );
    };

  const filteredOrders = statusFilter && statusFilter !== "all"
  ? orders.filter((o) => o.status === statusFilter)
  : orders;


    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20">
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
                Order Management
            </h2>

            {/* Filter */}
            <div className="mb-6 flex justify-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" ><p className="text-gray-800">all </p></SelectItem>
                        {statusOptions.map((s) => (
                            <SelectItem key={s} value={s}><p className="text-gray-800"> {s} </p></SelectItem>
                        ))}
                    </SelectContent>

                </Select>
            </div>

            {/* Orders Table */}
            <div className="max-w-7xl mx-auto overflow-x-auto border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-blue-100">
                            <TableHead className="text-black font-bold">Order ID</TableHead>
                            <TableHead className="text-black font-bold">Customer</TableHead>
                            <TableHead className="text-black font-bold">Status</TableHead>
                            <TableHead className="text-black font-bold">COD</TableHead>
                            <TableHead className="text-center text-black font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell  className="text-gray-800 font-bold">{order.id}</TableCell>
                                <TableCell>
                                    <p className="font-medium text-gray-500">{order.customer.name}</p>
                                    <p className="text-sm text-gray-600">{order.customer.email}</p>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onValueChange={(val) => handleStatusChange(order.id, val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {statusOptions.map((status) => (
                                                <SelectItem  key={status} value={status}>
                                                   <p className="text-gray-800"> {status} </p>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                  <p className="text-gray-500"> ₹{order.codAmount}</p> 
                                    <br />
                                    {order.isCODCollected ? (
                                        <span className="text-green-600 text-sm">Collected</span>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="mt-1"
                                            onClick={() => markCODCollected(order.id)}
                                        >
                                            Mark Collected
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell className="text-center space-x-2">
                                    {/* View Details Modal */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                View
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Order #{order.id}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-3">
                                                <div>
                                                    <h4 className="font-semibold">Customer Info</h4>
                                                    <p>{order.customer.name}</p>
                                                    <p className="text-sm text-gray-600">{order.customer.email}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Products</h4>
                                                    {order.products.map((p, idx) => (
                                                        <div key={idx} className="text-sm">
                                                            {p.name} × {p.quantity} = ₹{p.quantity * p.price}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="font-semibold">Total COD: ₹{order.codAmount}</div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Print Invoice */}
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => window.print()}
                                    >
                                        Print
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
