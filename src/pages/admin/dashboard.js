import React from "react";

const cards = [
    { title: "Total Users", value: 1240, icon: "👤" },
    { title: "Orders Today", value: 87, icon: "🛒" },
    { title: "Revenue", value: "$12,340", icon: "💰" },
    { title: "Pending Orders", value: 15, icon: "⏳" },
];

const recentOrders = [
    { id: 101, customer: "Alice", amount: "$120", status: "Completed", date: "2024-06-10" },
    { id: 102, customer: "Bob", amount: "$80", status: "Pending", date: "2024-06-10" },
    { id: 103, customer: "Charlie", amount: "$200", status: "Completed", date: "2024-06-09" },
    { id: 104, customer: "Diana", amount: "$50", status: "Cancelled", date: "2024-06-09" },
];

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen font-sans">
           
             
            {/* Main content */}
            <main className="flex-1 pt-6">
                
                {/* Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-xl shadow-md flex flex-col items-center py-8 px-4"
                        >
                            <span className="text-4xl">{card.icon}</span>
                            <div className="text-lg mt-3 text-gray-700">{card.title}</div>
                            <div className="text-2xl font-bold mt-2 text-gray-600">{card.value}</div>
                        </div>
                    ))}
                </section>
                {/* Recent Orders */}
                <section className="bg-white rounded-xl text-gray-700 shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-2 px-3 font-medium text-gray-700">Order ID</th>
                                    <th className="py-2 px-3 font-medium text-gray-700">Customer</th>
                                    <th className="py-2 px-3 font-medium text-gray-700">Amount</th>
                                    <th className="py-2 px-3 font-medium text-gray-700">Status</th>
                                    <th className="py-2 px-3 font-medium text-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-t">
                                        <td className="py-2 px-3">{order.id}</td>
                                        <td className="py-2 px-3">{order.customer}</td>
                                        <td className="py-2 px-3">{order.amount}</td>
                                        <td className="py-2 px-3">
                                            <span
                                                className={
                                                    order.status === "Completed"
                                                        ? "text-green-600"
                                                        : order.status === "Pending"
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}