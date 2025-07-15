import dbConnect from '@/src/lib/dbConnect';
import Product from '@/src/models/Product';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, message: 'Product ID is required' });
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 