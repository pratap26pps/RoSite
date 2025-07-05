import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Link from 'next/link';
import Router from 'next/router';
import toast from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = Router;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetch('/Animations/signup.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Animation load error:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let newErrors = {};

    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Otp Sent! Please verify your email.");
      if (typeof window !== 'undefined') {
        localStorage.setItem("pendingSignup", JSON.stringify(formData));
      }

      router.push(`/otp?email=${formData.email}`);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-blue-200 px-2 py-20 gap-6">
      {/* Form Section */}
      <div className="bg-blue-100 shadow-xl rounded-2xl px-4 py-6 w-full max-w-md mx-auto sm:px-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ROTECX
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full sm:w-1/2 px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full sm:w-1/2 px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.mobile && (
            <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Password */}
            <div className="relative w-full sm:w-1/2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full sm:w-1/2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 placeholder:text-black border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 text-gray-500"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Google Signup */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full mt-4 flex items-center text-white cursor-pointer justify-center gap-2 border border-gray-400 py-2 rounded-lg bg-gray-600 transition"
        >
          <FaGoogle size={18} />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Lottie Animation */}
      {animationData && (
        <div className="w-full max-w-xs mx-auto lg:mt-52 lg:scale-125 flex justify-center items-center">
          <div className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px]">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;