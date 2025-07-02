import formidable from "formidable";
import connectDB from "@/src/lib/dbConnect";
 
import product from "@/src/models/product";
import { productSchema } from "@/src/lib/zodSchemas/productSchema";
import imageuploadcloudanary from "@/src/lib/imageUpload";

// Disable body parser to handle FormData with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ message: "Form parsing error", error: err });

      try {
        // Convert all field values to plain strings
        const data = {
          name: fields.name?.toString(),
          description: fields.description?.toString(),
          price: Number(fields.price),
        };

        // Validate fields using Zod
        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
          return res.status(400).json({ message: "Validation error", error: parsed.error });
        }

        // Upload image to Cloudinary
        const file = files.image;
        if (!file) {
          return res.status(400).json({ message: "Image is required" });
        }

        const uploadedImage = await imageuploadcloudanary(file, "products");

        // Save product to DB
        const newProduct = await product.create({
          ...parsed.data,
          image: uploadedImage.secure_url,
        });

        return res.status(201).json(newProduct);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Upload failed", error: error.message });
      }
    });
  } else if (req.method === "GET") {
    const products = await product.find();
    return res.status(200).json(products);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
