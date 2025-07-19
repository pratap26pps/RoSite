import dbConnect from '@/src/lib/dbConnect';
import Order from '@/src/models/Order';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'PATCH') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  try {
    const { orderId, status, trackingAddress, ...rest } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }
    const updateFields = { ...rest };
    if (status) updateFields.status = status;
    if (trackingAddress) updateFields.trackingAddress = trackingAddress;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} 