import product from "@/src/models/product";

export default function handler(req, res) {
    const {
        query: { slug },
        method,
    } = req;

    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const product = product.find((p) => p.slug === slug);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
}