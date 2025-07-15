import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, DollarSign, Users, CheckCircle, Eye, Pencil, Trash2, User, CreditCard, Truck, Clock, Bolt } from "lucide-react";

export default function OverviewContent() {
  // Dashboard stats
  const [dashboardData] = useState({
    totalOrders: 1247,
    totalRevenue: 98450,
    activeUsers: 3421,
    deliveredOrders: 1089,
     
  });

  // Recent orders
  const [orders] = useState([
    {
      id: 'ORD-001', customer: 'Alice Johnson', product: 'Wireless Headphones', amount: '129.99', status: 'delivered', date: '2024-01-14', address: '123 Main St, New York'
    },
    {
      id: 'ORD-002', customer: 'Bob Smith', product: 'Smart Watch', amount: '299.99', status: 'pending', date: '2024-01-15', address: '456 Oak Ave, Los Angeles'
    },
    {
      id: 'ORD-003', customer: 'Carol Davis', product: 'Laptop Stand', amount: '49.99', status: 'shipped', date: '2024-01-13', address: '789 Pine Rd, Chicago'
    },
    {
      id: 'ORD-004', customer: 'David Wilson', product: 'Bluetooth Speaker', amount: '89.99', status: 'processing', date: '2024-01-15', address: '321 Elm St, Miami'
    }
  ]);

  // Recent activity
  const [recentActivity] = useState([
    { id: 1, action: 'New order received', time: '2 minutes ago', type: 'order' },
    { id: 2, action: 'User registered', time: '5 minutes ago', type: 'user' },
    { id: 3, action: 'Payment processed', time: '10 minutes ago', type: 'payment' },
    { id: 4, action: 'Order shipped', time: '15 minutes ago', type: 'shipping' }
  ]);

  // Sample data for the bar chart
  const weeklyStats = [
    { label: 'Week 1', orders: 320, revenue: 22000 },
    { label: 'Week 2', orders: 410, revenue: 26000 },
    { label: 'Week 3', orders: 280, revenue: 18000 },
    { label: 'Week 4', orders: 237, revenue: 14500 },
  ];
  const monthlyStats = [
    { label: 'Jan', orders: 1200, revenue: 90000 },
    { label: 'Feb', orders: 1100, revenue: 85000 },
    { label: 'Mar', orders: 1300, revenue: 95000 },
    { label: 'Apr', orders: 1250, revenue: 91000 },
    { label: 'May', orders: 1400, revenue: 100000 },
    { label: 'Jun', orders: 1350, revenue: 98000 },
    { label: 'Jul', orders: 1200, revenue: 92000 },
    { label: 'Aug', orders: 1500, revenue: 110000 },
    { label: 'Sep', orders: 1450, revenue: 108000 },
    { label: 'Oct', orders: 1380, revenue: 99000 },
    { label: 'Nov', orders: 1420, revenue: 102000 },
    { label: 'Dec', orders: 1550, revenue: 115000 },
  ];
  const yearlyStats = [
    { label: '2021', orders: 14500, revenue: 1050000 },
    { label: '2022', orders: 15800, revenue: 1120000 },
    { label: '2023', orders: 16200, revenue: 1200000 },
    { label: '2024', orders: 17000, revenue: 1300000 },
  ];

  const [barView, setBarView] = useState('week');
  const [barData, setBarData] = useState([]);
  const [barLoading, setBarLoading] = useState(true);
  const [barError, setBarError] = useState('');

  useEffect(() => {
    setBarLoading(true);
    setBarError('');
    fetch(`/api/order-stats`)
      .then(res => res.json())
      .then(data => {
        setBarData(data[barView] || []);
        setBarLoading(false);
      })
      .catch(() => {
        setBarError('Failed to load stats');
        setBarLoading(false);
      });
  }, [barView]);

  // Helpers
  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800 border-green-200',
      shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };
  const getStatusIcon = (status) => {
    const icons = {
      delivered: <CheckCircle className="w-4 h-4 text-green-600" />, // delivered
      shipped: <Truck className="w-4 h-4 text-blue-600" />, // shipped
      pending: <Clock className="w-4 h-4 text-yellow-600" />, // pending
      processing: <Bolt className="w-4 h-4 text-purple-600" /> // processing
    };
    return icons[status] || <Clock className="w-4 h-4 text-gray-600" />;
  };

  // Stat card
  const StatCard = ({ title, value, icon, growth, color }) => (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</p>
          {growth && (
            <p className="text-xs text-green-600 mt-1">
              +{growth}% from last month
            </p>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  // Order row
  const OrderRow = ({ order }) => (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-medium text-gray-900 dark:text-gray-100">{order.id}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{order.customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{order.product}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-gray-900 dark:text-gray-100">{order.amount}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>{getStatusIcon(order.status)} <span className="ml-1">{order.status.toUpperCase()}</span></span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{order.date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"><Eye className="w-4 h-4" /></button>
          <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"><Pencil className="w-4 h-4" /></button>
          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );

  // Activity item
  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
        {activity.type === 'order' && <ShoppingCart className="w-4 h-4" />}
        {activity.type === 'user' && <User className="w-4 h-4" />}
        {activity.type === 'payment' && <CreditCard className="w-4 h-4" />}
        {activity.type === 'shipping' && <Truck className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Bar Graph for Orders & Revenue per Week/Month/Year */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Orders & Revenue</h3>
          <select
            value={barView}
            onChange={e => setBarView(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="week">Week Wise</option>
            <option value="month">Month Wise</option>
            <option value="year">Year Wise</option>
          </select>
        </div>
        <div className="w-full h-72 flex items-center justify-center">
          {barLoading ? (
            <div className="text-gray-500 dark:text-gray-300">Loading...</div>
          ) : barError ? (
            <div className="text-red-500">{barError}</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" stroke="#6b7280" className="text-xs" />
                <YAxis yAxisId="left" orientation="left" stroke="#6b7280" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" className="text-xs" tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={(value, name) => name === 'revenue' ? `₹${value}` : value} />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#6366f1" name="Orders" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" fill="#f59e42" name="Revenue" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={dashboardData.totalOrders} icon={<ShoppingCart className="w-8 h-8 text-green-600" />} growth={dashboardData.orderGrowth} color="text-green-600" />
        <StatCard title="Total Revenue" value={dashboardData.totalRevenue} icon={<DollarSign className="w-8 h-8 text-blue-600" />} growth={dashboardData.revenueGrowth} color="text-blue-600" />
        <StatCard title="Active Users" value={dashboardData.activeUsers} icon={<Users className="w-8 h-8 text-purple-600" />} growth={dashboardData.userGrowth} color="text-purple-600" />
        <StatCard title="Delivered Orders" value={dashboardData.deliveredOrders} icon={<CheckCircle className="w-8 h-8 text-green-600" />} color="text-green-600" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.slice(0, 5).map(order => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {recentActivity.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}