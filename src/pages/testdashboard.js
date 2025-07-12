import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { clearUser } from '../redux/slices/authSlice';
const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);
    console.log("User in Dashboard:", user);
    const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview');
 
   const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    image: "",
    email:""
  });
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
 
  
 useEffect(() => {
  if (user) {
    const firstName = user.firstName || user.name?.split(" ")[0] || "";
    const lastName = user.lastName || user.name?.split(" ").slice(1).join(" ") || "";
     const email = user.email
    setProfileForm({
      firstName,
      lastName,
       email,
      mobile: user.mobile || "",
      image: user.image || "",
    });
  }
}, [user]);

  // Sample data
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 1247,
    totalRevenue: 98450,
    activeUsers: 3421,
    deliveredOrders: 1089,
    pendingOrders: 158,
    orderGrowth: 12.5,
    revenueGrowth: 8.3,
    userGrowth: 15.2
  });
 

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Alice Johnson',
      product: 'Wireless Headphones',
      amount: '$129.99',
      status: 'delivered',
      date: '2024-01-14',
      address: '123 Main St, New York'
    },
    {
      id: 'ORD-002',
      customer: 'Bob Smith',
      product: 'Smart Watch',
      amount: '$299.99',
      status: 'pending',
      date: '2024-01-15',
      address: '456 Oak Ave, Los Angeles'
    },
    {
      id: 'ORD-003',
      customer: 'Carol Davis',
      product: 'Laptop Stand',
      amount: '$49.99',
      status: 'shipped',
      date: '2024-01-13',
      address: '789 Pine Rd, Chicago'
    },
    {
      id: 'ORD-004',
      customer: 'David Wilson',
      product: 'Bluetooth Speaker',
      amount: '$89.99',
      status: 'processing',
      date: '2024-01-15',
      address: '321 Elm St, Miami'
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New order received', time: '2 minutes ago', type: 'order' },
    { id: 2, action: 'User registered', time: '5 minutes ago', type: 'user' },
    { id: 3, action: 'Payment processed', time: '10 minutes ago', type: 'payment' },
    { id: 4, action: 'Order shipped', time: '15 minutes ago', type: 'shipping' }
  ]);

  const AdminItems = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'orders', label: 'Orders', icon: '🛒' },
    { key: 'customers', label: 'Customers', icon: '👥' },
    { key: 'Add Category/Product', label: 'Add Category/Product', icon: '⊍' },
    { key: 'Product-History', label: 'Product-History', icon: '👥' },
    { key: 'deliveries', label: 'Deliveries', icon: '🚚' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];
    const CustomerItems = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'orders history', label: 'Orders', icon: '🛒' },
    { key: 'my Cart', label: 'Customers', icon: '👥' },
    { key: 'deliveries', label: 'Deliveries', icon: '🚚' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

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
 
   const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data before submit:", profileForm);

      const res = await axios.patch("/api/auth/update-profile", profileForm,);
      toast.success(res.data.message || "Profile updated!");
      const updatedUser = {
        ...res.data.user,
        name: `${formData.firstName} ${formData.lastName}`,
      };
      dispatch(setUser(updatedUser));
    } catch (err) {
      toast.error(err.response || "Update failed!");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async(e) => {
       e.preventDefault();
    setDeleteModalVisible(false);
 
  
    if (confirm !== "DELETE") {
      toast.error("You must type DELETE to confirm.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.delete("/api/auth/delete-account");
      toast.success(res.data.message || "Account deleted.");
    
       dispatch(clearUser());
       setUser(null);
      await signOut({ redirect: false });
      router.push("/authpage");
    } catch (err) {

      toast.error(err.data || "Delete failed!");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, growth, color }) => (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center justify-between">
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

  const OrderRow = ({ order }) => (
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
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">👁️</button>
          <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">✏️</button>
          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">🗑️</button>
        </div>
      </td>
    </tr>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
        {activity.type === 'order' && '🛒'}
        {activity.type === 'user' && '👤'}
        {activity.type === 'payment' && '💳'}
        {activity.type === 'shipping' && '🚚'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
      </div>
    </div>
  );


const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg transform transition-all overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
            id="modal-title"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
 


  const OverviewContent = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          icon="🛒"
          growth={dashboardData.orderGrowth}
          color="text-green-600"
        />
        <StatCard
          title="Total Revenue"
          value={dashboardData.totalRevenue}
          icon="💰"
          growth={dashboardData.revenueGrowth}
          color="text-blue-600"
        />
        <StatCard
          title="Active Users"
          value={dashboardData.activeUsers}
          icon="👥"
          growth={dashboardData.userGrowth}
          color="text-purple-600"
        />
        <StatCard
          title="Delivered Orders"
          value={dashboardData.deliveredOrders}
          icon="✅"
          color="text-green-600"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
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

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'overview':
        return <OverviewContent />;
      case 'orders':
        return (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
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
        );
      case 'customers':
        return (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Customer management interface coming soon...</p>
          </div>
        );
      case 'deliveries':
        return (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Delivery Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Delivery tracking and management interface...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">System Settings</h3>
            <p className="text-gray-600 dark:text-gray-400">System configuration and settings...</p>
          </div>
        );
      default:
        return <OverviewContent />;
    }
  };

 
   const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append("image", file);

    try {
      setLoading2(true);
      const res = await axios.post("/api/upload", uploadForm);
      const imageUrl = res.data.url;
      console.log("Image uploaded successfully:", imageUrl);
      setProfileForm((prev) => ({ ...prev, image: imageUrl }));
      dispatch(setUser( {
        ...user,
        image: imageUrl,
      }));
    
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Image upload failed:", err);
    
    }finally {
      setLoading2(false);
    }
  };

 
  
   
 if (!user)
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100  relative">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>

      {/* Animated Background */}
      <div className="fixed  inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-sm animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="flex h-screen relative top-20 z-10">
        {/* Sidebar */}
        <div className={`${collapsed ? 'w-20' : 'w-80'}  h-[90%] transition-all duration-300 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-xl`}>
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user?.image}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
              {!collapsed && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{ user?.name || `${user.firstName} ${user?.lastName}` }</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.role}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            {
              user.role === "admin" ? 
            
            <ul className="space-y-2">
              {AdminItems.map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setSelectedMenuItem(item.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedMenuItem === item.key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
            :
             
            <ul className="space-y-2">
              {CustomerItems.map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setSelectedMenuItem(item.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedMenuItem === item.key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
            }
          </nav>

          {/* Profile Actions */}
          {!collapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <button
                onClick={() => setProfileModalVisible(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span>✏️</span>
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setDeleteModalVisible(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <span>🗑️</span>
                <span>Delete Account</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16  bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{collapsed ? '☰' : '✕'}</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {AdminItems.find(item => item.key === selectedMenuItem)?.label}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
             
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
           <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {loading2 && (
              <div className="mt-2 text-blue-600">Uploading image...</div>
            )}
            {profileForm.image && (
              <img
                src={profileForm?.image || user?.image || "/images/avatar.png"}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              type="text"
                  name="firstName" 
              value={profileForm.firstName}
                 onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder={user?.firstName || ""}
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              type="text"
                  name="lastName" 
              value={profileForm.lastName}
               onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder={user?.firstName || ""}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input
              type="tel"
                  name="mobile" 
              value={profileForm.mobile}
                 onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder={user.phone}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setProfileModalVisible(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Delete Account"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Are you absolutely sure?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your account
            and remove all associated data from our servers.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type 'DELETE' to confirm:
              </label>
              <input
                type="text"
                   onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="DELETE"
              />
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setDeleteModalVisible(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Account
                  </button>
                </div> 

                </div>
                </div>
      </Modal>

      </div>
  )
}
  export default AdminDashboard;

