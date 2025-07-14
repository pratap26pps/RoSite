import dbConnect from '../../lib/dbConnect';
import Category from '../../models/Category';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const categories = await Category.find({ isActive: true })
            .populate({
                path: 'products',
                match: { isActive: true },
                select: 'name price quantity description image'
            })
            .select('name description products')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
} 