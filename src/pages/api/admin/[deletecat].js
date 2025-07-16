import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';
import Product from '@/src/models/Product';
export default async function handler(req, res) {
  await dbConnect();

  const { deletecat } = req.query;

  if (req.method === 'DELETE') {
    if (!deletecat) {
      return res.status(400).json({ success: false, message: 'Category ID is required' });
    }

    try {
         await Product.deleteMany({ category: deletecat });
      const deleted = await Category.findByIdAndDelete(deletecat);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Delete Error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
}
