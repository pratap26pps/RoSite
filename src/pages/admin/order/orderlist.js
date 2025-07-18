"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function OrderManagement() {
  // Get all orders from redux
  const { orders: reduxOrders } = useSelector((state) => state.order);

  // Map redux orders to table format
  const orders = useMemo(() => {
    return reduxOrders.map(order => {
      const customer = order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() : '';
      const productNames = order.items && order.items.length > 0 ? order.items.map(item => item.product?.name || '').join(', ') : '';
      const quantity = order.items && order.items.length > 0 ? order.items.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;
      return {
        id: order.orderId || order._id,
        customer,
        product: productNames,
        quantity,
        amount: order.totalAmount,
        status: order.status,
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '',
        address: order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city}` : '',
        trackingAddress: order.trackingAddress || '',
        trackingHistory: order.trackingHistory || [],
        raw: order,
      };
    });
  }, [reduxOrders]);
  
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  // New states for tracking functionality
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [showTrackingHistory, setShowTrackingHistory] = useState({});
  const [editTrackingAddress, setEditTrackingAddress] = useState(null);
  const [newTrackingAddress, setNewTrackingAddress] = useState('');
  const [newTrackingEntry, setNewTrackingEntry] = useState({ location: '', status: 'processing' });

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = () => {
    setOrders((prev) => prev.map((o) => o.id === editOrder.id ? { ...editOrder, ...editForm } : o));
    setEditOrder(null);
    setEditForm({});
  };

  const handleDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deleteOrder.id));
    setDeleteOrder(null);
  };

  // New handlers for tracking functionality
  const toggleTrackingHistory = (orderId) => {
    setShowTrackingHistory(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleUpdateTrackingAddress = () => {
    if (newTrackingAddress.trim()) {
      setOrders(prev => prev.map(order => 
        order.id === editTrackingAddress.id 
          ? { ...order, trackingAddress: newTrackingAddress.trim() }
          : order
      ));
      setEditTrackingAddress(null);
      setNewTrackingAddress('');
    }
  };

  const handleAddTrackingEntry = () => {
    if (newTrackingEntry.location.trim()) {
      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', '');

      setOrders(prev => prev.map(order => 
        order.id === trackingOrder.id 
          ? { 
              ...order, 
              trackingHistory: [
                ...order.trackingHistory,
                {
                  timestamp,
                  location: newTrackingEntry.location.trim(),
                  status: newTrackingEntry.status
                }
              ]
            }
          : order
      ));
      setNewTrackingEntry({ location: '', status: 'processing' });
    }
  };

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
      delivered: '✅',
      shipped: '🚚',
      pending: '⏳',
      processing: '⚡'
    };
    return icons[status] || '⏳';
  };

  const getTrackingStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      delivered: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTrackingStatusIcon = (status) => {
    const icons = {
      confirmed: '📋',
      processing: '⚡',
      shipped: '🚚',
      delivered: '✅'
    };
    return icons[status] || '📋';
  };

  const OrderRow = ({ order }) => (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="font-medium text-gray-900 dark:text-gray-100">{order.id}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
          {order.customer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
          {order.product}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
          {order.quantity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{order.amount}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)} {order.status.toUpperCase()}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
          {order.date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
          <span className="text-sm font-medium">{order.trackingAddress}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex space-x-2">
            {/* Tracking History Button */}
            <button 
              onClick={() => toggleTrackingHistory(order.id)}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300" 
              title="Show/Hide Tracking History"
            >
              <span role="img" aria-label="Tracking">Track</span>
            </button>
             {/* Edit Tracking Address Button */}
            <button 
              onClick={() => {
                setEditTrackingAddress(order);
                setNewTrackingAddress(order.trackingAddress);
              }}
              className="text-gray-900" 
              title="Edit Tracking Address"
            >
              <span role="img" aria-label="Edit Tracking">Edit</span>
            </button>

            
            {/* View Order Button */}
            <Dialog open={!!viewOrder && viewOrder.id === order.id} onOpenChange={(open) => setViewOrder(open ? order : null)}>
              <DialogTrigger asChild>
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" title="View">
                  <span role="img" aria-label="View">View</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-blue-700 dark:text-cyan-300">Order Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 text-gray-800 dark:text-gray-100">
                  <div><b>Order ID:</b> {order.id}</div>
                  <div><b>Customer:</b> {order.customer}</div>
                  <div><b>Product:</b> {order.product}</div>
                  <div><b>Quantity:</b> {order.quantity}</div>
                  <div><b>Amount:</b> {order.amount}</div>
                  <div><b>Status:</b> {order.status}</div>
                  <div><b>Date:</b> {order.date}</div>
                  <div><b>Address:</b> {order.address}</div>
                  <div><b>Tracking Address:</b> {order.trackingAddress}</div>
                </div>
              </DialogContent>
            </Dialog>

           

            {/* Delete Order Button */}
            <Dialog open={!!deleteOrder && deleteOrder.id === order.id} onOpenChange={(open) => setDeleteOrder(open ? order : null)}>
              <DialogTrigger asChild>
                <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" title="Delete">
                  <span role="img" aria-label="Delete">Delete</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-red-600 dark:text-red-400">Delete Order</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-gray-800 dark:text-gray-100">Are you sure you want to delete order <b>{order.id}</b>?</div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDeleteOrder(null)} className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">Cancel</Button>
                  <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">Delete</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </td>
      </tr>
      
      {/* Tracking History Row */}
      {showTrackingHistory[order.id] && (
        <tr className="bg-gray-50 dark:bg-gray-900/30">
          <td colSpan="9" className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Tracking History</h4>
                <button
                  onClick={() => setTrackingOrder(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
                >
                  Add Entry
                </button>
              </div>
              <div className="space-y-2">
                {order.trackingHistory.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTrackingStatusColor(entry.status)}`}>
                      {getTrackingStatusIcon(entry.status)} {entry.status.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{entry.location}</p>
                      <p className="text-xs  text-gray-400">{entry.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      {/* Edit Tracking Address Modal */}
      <Dialog open={!!editTrackingAddress} onOpenChange={(open) => !open && setEditTrackingAddress(null)}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-purple-600 dark:text-purple-300">Edit Tracking Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">Order ID</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">{editTrackingAddress?.id}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Current Tracking Address</label>
              <p className="text-sm text-gray-800 dark:text-gray-400">{editTrackingAddress?.trackingAddress}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">New Tracking Address</label>
              <input 
                type="text" 
                value={newTrackingAddress} 
                onChange={(e) => setNewTrackingAddress(e.target.value)}
                className="w-full border rounded px-2 py-1 dark:bg-gray-800 text-black dark:border-gray-700"
                placeholder="Enter new tracking address"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditTrackingAddress(null)} className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                Cancel
              </Button>
              <Button onClick={handleUpdateTrackingAddress} className="bg-purple-600 text-white hover:bg-purple-700">
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tracking Entry Modal */}
      <Dialog open={!!trackingOrder} onOpenChange={(open) => !open && setTrackingOrder(null)}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-blue-600 dark:text-blue-300">Add Tracking Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Order ID</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">{trackingOrder?.id}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Location</label>
              <input 
                type="text" 
                value={newTrackingEntry.location} 
                onChange={(e) => setNewTrackingEntry({...newTrackingEntry, location: e.target.value})}
                className="w-full border rounded px-2 py-1 dark:bg-gray-800 text-gray-600 dark:border-gray-700"
                placeholder="Enter location or status update"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Status</label>
              <select 
                value={newTrackingEntry.status} 
                onChange={(e) => setNewTrackingEntry({...newTrackingEntry, status: e.target.value})}
                className="w-full border rounded px-2 py-1 dark:bg-gray-800 text-gray-600 dark:border-gray-700"
              >
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setTrackingOrder(null)} className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                Cancel
              </Button>
              <Button onClick={handleAddTrackingEntry} className="bg-blue-600 text-white hover:bg-blue-700">
                Add Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Table */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tracking Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map(order => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
