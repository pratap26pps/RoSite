import connectDB from '@/src/lib/dbConnect';
import User from '@/src/models/users';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'User id is required' });
  }
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
} 