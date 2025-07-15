import dbConnect from '@/src/lib/dbConnect';
import Product from '@/src/models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PATCH') {
    try {
      const { id, ...editProduct } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
      }

      const updated = await Product.findByIdAndUpdate(id, editProduct, { new: true }).populate({ path: 'category', select: 'name' })
      .sort({ createdAt: -1 });;

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      return res.status(200).json({ success: true, product: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
