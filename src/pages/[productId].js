"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams(); // get dynamic ID from the route
  console.log(params);
const productId = params?.productId;
  const productData = useSelector((state) => state.product.products);
  const selectedProduct = productData.find((item) => item._id === productId);
  console.log(selectedProduct)

  const [mainImg, setMainImg] = useState(
    selectedProduct?.images?.[0] || "/placeholder.jpg"
  );

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="text-center text-red-500 py-20">
        Product not found for ID: {productId}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-25 px-2 md:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="w-full flex justify-center mb-4">
            <img
              src={mainImg}
              alt="Product"
              width={320}
              height={400}
              className="rounded-xl object-contain bg-white"
            />
          </div>
          <div className="flex gap-2 justify-center">
            {selectedProduct.images?.map((img, idx) => (
              <button
                key={img}
                onClick={() => setMainImg(img)}
                className={`border-2 rounded-lg p-1 ${
                  mainImg === img ? "border-blue-600" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  width={60}
                  height={60}
                  className="object-contain rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {selectedProduct.name}
          </h1>
        <p className="text-sm text-gray-500">SKU: {selectedProduct?.skuid}</p>

          {/* Fake placeholders for missing fields */}
          <div className="flex items-center gap-3 text-yellow-500 text-lg">
            <span>★ 4.5</span>
            <span className="text-gray-600 dark:text-gray-300 text-base">
              (120 ratings)
            </span>
            <span className="text-green-600 text-sm font-medium">
              50+ bought in past month
            </span>
          </div>
         <div className=" text-gray-700 dark:text-gray-200 text-base   ">
                  Category:      {selectedProduct?.category?.name}
                      </div>
     
          {/* Pricing */}
          <div className="flex items-end gap-4 flex-wrap">
            <span className="text-3xl font-bold text-red-600">
              ₹{selectedProduct.price?.toLocaleString()}
            </span>
            <span className="text-base text-gray-500 line-through">₹499</span>
            <span className="text-base text-green-600 font-semibold">-30%</span>
          </div>

          <div className="text-gray-700 dark:text-gray-200 text-base">
            Inclusive of all taxes
          </div>
         <div className="text-gray-700 dark:text-gray-200 text-base">
           quantity: {selectedProduct.quantity}
          </div>
          <button
            onClick={() => router.push("/customer/billingorder")}
            className="w-full cursor-pointer bg-black text-white text-center py-2 rounded-xl font-bold text-lg mt-4 shadow hover:bg-gray-900 transition"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>

      {/* About this item */}
      <div className="max-w-5xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          About this item
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {selectedProduct.description}
        </p>
      </div>
    </div>
  );
}
