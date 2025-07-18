import connectDB from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';
import User from '@/src/models/users';

function padOrderNumber(num) {
  return num.toString().padStart(11, '0');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { user, items, totalAmount, shippingAddress, paymentMethod } = req.body;
  if (!user || !items || !totalAmount || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    await connectDB();
    // Get the current order count for unique orderId
    const orderCount = await Order.countDocuments();
    const orderId = `ORDEROXID${padOrderNumber(orderCount + 1)}`;
    const newOrder = await Order.create({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderId,
    });
    // Optionally, update user with order reference if user schema supports it
    // await User.findByIdAndUpdate(user, { $push: { orders: newOrder._id } });
    res.status(201).json({ message: 'Order placed', order: newOrder, orderId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
} 