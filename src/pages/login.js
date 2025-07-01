'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Link from 'next/link';
const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [animationData, setAnimationData] = useState(null);
  const [animationData1, setAnimationData1] = useState(null);

  useEffect(() => {
    fetch('/Animations/hello.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/Animations/Login.json')
      .then((response) => response.json())
      .then((data) => setAnimationData1(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google Login Clicked');
    // Google OAuth logic here
  };

  return (
    <div className="min-h-screen flex flex-col pt-34   lg:flex-row-reverse items-center justify-around bg-blue-200 px-4 py-10 gap-10">

      {/* Left Side Animation */}
      {animationData1 && (
        <div className="w-full max-w-sm lg:max-w-md">
          <Lottie animationData={animationData1} loop={true} />
        </div>
      )}

      {/* Login Card */}
      <div className="bg-gray-300 shadow-xl rounded-2xl px-6 py-6 w-full max-w-md">

        {/* Top Logo + Welcome */}
        <div className="flex justify-between items-center mb-4">
         <Link href="/" className="text-xl font-bold text-blue-600">
        ROTECX
        </Link>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-extrabold text-gray-700">Welcome Back!</h2>
            {animationData && (
              <div className="w-24 h-24">
                <Lottie animationData={animationData} loop={true} />
              </div>
            )}
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-xl text-black font-bold text-center mb-6">Login to Your Account</h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your email"
              className="w-full px-4 py-2  placeholder:text-black border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder="Enter your password"
                className="w-full px-4 py-2  placeholder:text-black border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border  py-2 rounded-lg bg-gray-600  transition"
        >
          <FaGoogle size={18} />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-green-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default login;
