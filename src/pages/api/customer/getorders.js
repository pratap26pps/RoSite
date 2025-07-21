import connectDB from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';
import Payment from '@/src/models/Payment';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import users from '@/src/models/users';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Get user session for authentication
    const session = await getServerSession(req, res, authOptions);
    
    let orders;
    
    if (session && session.user && session.user.email) {
      const user = await users.findOne({ email: session.user.email });
      
      if (user && user.role === 'admin') {
        // For admin, fetch all orders
        orders = await Order.find()
          .populate('user', 'firstName lastName email name')
          .populate('items.product', 'name price images')
          .sort({ createdAt: -1 }); // Most recent first
      } else {
        // Fetch orders for authenticated user
        orders = await Order.find({ user: user._id })
          .populate('user', 'firstName lastName email name')
          .populate('items.product', 'name price images')
          .sort({ createdAt: -1 }); // Most recent first
      }
    } else {
      // For unauthenticated requests, return empty array
      orders = [];
    }
    
    // Get payment information for each order
    const ordersWithPayments = await Promise.all(
      orders.map(async (order) => {
        const payments = await Payment.find({ orderId: order._id })
          .sort({ createdAt: -1 })
          .limit(1); // Get latest payment
          
        return {
          ...order.toObject(),
          latestPayment: payments[0] || null
        };
      })
    );
    
    res.status(200).json({ 
      success: true,
      orders: ordersWithPayments,
      count: ordersWithPayments.length
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch orders', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}