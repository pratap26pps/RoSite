import connectDB from '@/src/lib/dbConnect';
import User from '@/src/models/users';

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {

    await connectDB();
    const searchedRole = req.query.role;
    const users = await User.find({role : searchedRole}, '-password');  
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
} 