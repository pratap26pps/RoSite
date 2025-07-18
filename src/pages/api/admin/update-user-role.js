import connectDB from '@/src/lib/dbConnect';
import User from '@/src/models/users';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { userId, newRole } = req.body;
  if (!userId || !newRole) {
    return res.status(400).json({ message: 'userId and newRole are required' });
  }
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = newRole;
    await user.save();
    res.status(200).json({ message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role', error: error.message });
  }
} 