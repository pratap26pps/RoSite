"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams(); // get dynamic ID from the route
  console.log(params);
const productId = params?.productId;
  const productData = useSelector((state) => state.product.products);
  const selectedProduct = productData.find((item) => item.slug === productId);
  console.log(selectedProduct)
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [mainImg, setMainImg] = useState(
    selectedProduct?.images?.[0] || "/placeholder.jpg"
  );

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const [adding, setAdding] = useState(false);

  // Add to Cart handler
  const handleAddToCart = () => {
    if (selectedProduct.quantity === 0) {
      toast.error("Product is out of stock");
      return;
    }
    setAdding(true);
    try {
      dispatch(addToCart(selectedProduct));
      const updatedCart = [...cartItems, { ...selectedProduct, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      toast.success(`${selectedProduct.name} added to cart`);
    } catch (error) {
      console.log("error in product",error)
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="text-center text-red-500 py-20">
        Product not found for ID: {productId}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:py-25 px-2 md:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
     <div className="flex flex-col items-center md:w-1/2">
  {/* Main Image Container */}
  <div className="w-full flex justify-center ">
    <img
      src={mainImg}
      alt="Product"
      className="rounded-xl bg-white object-contain w-[400px] h-[400px] transition-all duration-300 ease-in-out"
    />
  </div>

  {/* Thumbnail Images */} 
  <div className="flex gap-2 p-1 justify-center">
    {selectedProduct.images?.map((img, idx) => (
      <button
        key={img}
        onClick={() => setMainImg(img)}
        className={`border-2 rounded-lg p-1 transition-all duration-200 ${
          mainImg === img ? "border-blue-600" : "border-gray-300"
        }`}
      >
        <Image
          src={img}
          alt={`thumb-${idx}`}
          width={70}
          height={70}
          className="object-contain rounded w-[70px] h-[70px]"
        />
      </button>
    ))}
  </div>
</div>


        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4 md:pt-7">
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
            <span className="text-base text-gray-500 line-through">
              ₹{selectedProduct.price ? Math.round(selectedProduct.price * 1.3).toLocaleString() : ''}
            </span>
            <span className="text-base text-green-600 font-semibold">-30%</span>
          </div>

          <div className="text-gray-700 dark:text-gray-200 text-base">
            Inclusive of all taxes
          </div>
         <div className="text-gray-700 dark:text-gray-200 text-base">
           quantity: {selectedProduct.quantity}
          </div>
         <div className="text-base">
            {selectedProduct.quantity === 0 ? (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            ) : (
              <span className="text-green-600 font-semibold">
                In Stock ({selectedProduct.quantity})
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={selectedProduct.quantity === 0 || adding}
            className={`w-full text-center py-2  cursor-pointer rounded-xl font-bold text-lg mt-2 shadow transition mb-2 ${
              selectedProduct.quantity === 0 || adding
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={() => router.push(`/customer/billingorder?skuid=${selectedProduct.skuid}`)}
            disabled={selectedProduct.quantity === 0}
            className={`w-full text-center py-2 cursor-pointer rounded-xl font-bold text-lg mt-0 shadow transition ${
              selectedProduct.quantity === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
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
