'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setUser } from '../redux/slices/authSlice';


const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      setloading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      dispatch(setUser(data.user));
      if (response.ok) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center lg:gap-52 bg-blue-200 px-2 py-5">
      {/* Left Side Animation */}
      {animationData1 && (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md scale-125 flex justify-center items-center mb-6 lg:mb-0">
          <Lottie animationData={animationData1} loop={true} />
        </div>
      )}

      {/* Login Card */}
      <div className="bg-blue-100 shadow-xl rounded-2xl px-4 py-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md ">
        {/* Top Logo + Welcome */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-lg sm:text-xl font-bold text-blue-600">
            ROTECX
          </Link>
          <div className="flex flex-col items-center">
            {animationData && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <Lottie animationData={animationData} loop={true} />
              </div>
            )}
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-lg sm:text-xl text-black font-bold text-center mb-4 sm:mb-6">Login to Your Account</h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
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
              className="w-full px-3 py-2 sm:px-4 sm:py-2 text-black placeholder:text-black border-2 border-blue-400 rounded-lg text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
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
                className="w-full px-3 py-2 sm:px-4 sm:py-2 text-black placeholder:text-black border-2 border-blue-400 rounded-lg text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Link href='/forgotpassword'>
              <label htmlFor="password" className="block mt-1 text-xs sm:text-sm hover:underline cursor-pointer font-medium text-gray-600">
                Forgot Password
              </label>
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-semibold transition duration-200 text-sm sm:text-base"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full mt-3 sm:mt-4 flex cursor-pointer items-center justify-center gap-2 border py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition text-white text-sm sm:text-base"
        >
          <FaGoogle size={16} />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-xs sm:text-sm text-center text-gray-600 mt-3 sm:mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default login;