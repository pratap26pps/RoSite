import React, { useState } from 'react';
import Image from 'next/image';
 import { useRouter } from 'next/navigation';

const productData = {
  id: 'kent-supreme-star-black',
  title: 'KENT Supreme Star RO Water Purifier | Advanced RO Tech for Sabse Shudh Paani | RO+UV+UF+TDS Control+Alkaline+Copper+UV in Tank | Auto Flush|9L|20 LPH|Ideal For Borewell/Tanker/Municipal Water |Black',
  rating: 4.1,
  reviews: 16264,
  bought: 600,
  price: 15998,
  mrp: 28000,
  discount: 43,
  emi: 776,
  images: [
    '/public/images/waterfamily.png',
    '/public/images/image.png',
    '/public/images/image copy 2.png',
    '/public/images/image copy 3.png',
  ],
  offers: [
    'Prime Savings 10% Instant Discount up to INR 1250 on SBI Credit Card Non-EMI Trxn. Min purchase value INR 5000. For Prime customers only',
    'No Cost EMI on select cards for orders above ₹3000',
  ],
  delivery: 'Pay on Delivery | 10 days Replacement | Amazon Delivered | Top Brand',
  about: [
    'Multiple purification by RO+UV+UF+TDS Control+Alkaline+Copper+UV In Tank makes water 100% pure and healthy.',
    'Retains essential minerals using TDS Control System.',
    'UV LED in storage tank keeps purified water pure for longer.',
    'Suitable for all water sources: borewell, tanker, or municipal water.',
    '9L storage capacity, 20 LPH purification capacity.',
    'Auto-flush and advanced digital display.',
    'Elegant black design, wall-mountable.',
  ],
};

export default function ProductDetail() {
  const router = useRouter();
  const [mainImg, setMainImg] = useState(productData.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-25 px-2 md:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="w-full flex justify-center mb-4">
            <Image src={mainImg} alt="Product" width={320} height={400} className="rounded-xl object-contain bg-white" />
          </div>
          <div className="flex gap-2 justify-center">
            {productData.images.map((img, idx) => (
              <button key={img} onClick={() => setMainImg(img)} className={`border-2 rounded-lg p-1 ${mainImg === img ? 'border-blue-600' : 'border-gray-300'}`}> 
                <Image src={img} alt={`thumb-${idx}`} width={60} height={60} className="object-contain rounded" />
              </button>
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{productData.title}</h1>
          <div className="flex items-center gap-3 text-yellow-500 text-lg">
            <span>★ {productData.rating}</span>
            <span className="text-gray-600 dark:text-gray-300 text-base">({productData.reviews} ratings)</span>
            <span className="text-green-600 text-sm font-medium">{productData.bought}+ bought in past month</span>
          </div>
          <div className="flex items-end gap-4 flex-wrap">
            <span className="text-3xl font-bold text-red-600">₹{productData.price.toLocaleString()}</span>
            <span className="text-base text-gray-500 line-through">₹{productData.mrp.toLocaleString()}</span>
            <span className="text-base text-green-600 font-semibold">-{productData.discount}%</span>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-base">Inclusive of all taxes</div>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">EMI starts at ₹{productData.emi}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">No Cost EMI available</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Exclusive Prime price</span>
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Offers</h3>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
              {productData.offers.map((offer, i) => (
                <li key={i}>{offer}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
            {productData.delivery.split('|').map((item, i) => (
              <span key={i} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{item.trim()}</span>
            ))}
          </div>
          <button
            onClick={() => router.push(`/${productData.id}`)}
            className="w-full cursor-pointer bg-black text-white text-center py-2 rounded-xl font-bold text-lg mt-4 shadow hover:bg-gray-900 transition"
          >
            View
          </button>
        </div>
      </div>
      {/* About this item */}
      <div className="max-w-5xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About this item</h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200 space-y-1">
          {productData.about.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 