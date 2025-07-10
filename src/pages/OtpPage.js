import React, { useState, useRef,useEffect } from 'react';
import { Sun, Moon, Shield, ArrowRight, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

const OTPPage = () => {

  const [isDark, setIsDark] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const router = useRouter();
  const [pendingSignup, setPendingSignup] = useState({});
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("pendingSignup");
        if (stored) {
          setPendingSignup(JSON.parse(stored));
        }
      }
    }, []);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async(e) => {
    e.preventDefault();
    if (!otp || !email) {
      toast.error("Missing email or OTP");
      return;
    }
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
        return  toast.error('Please enter complete OTP');
    }
 
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        ...pendingSignup,
        code: otpValue,
      });
      console.log("Response from OTP verification:", response.data.data);
      if (response.status === 200) {
        toast.success("Email verified successfully!");
        dispatch(setUser(response.data.data));
          
        router.push("/testdashboard");
        
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP or email. Please try again.");
    } finally {
      setLoading(false);
    }


  };
 
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen top-16  transition-all duration-500 relative overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Static Grid Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isDark ? 'opacity-20' : 'opacity-10'
      }`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${isDark ? '#374151' : '#6b7280'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? '#374151' : '#6b7280'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-xl animate-pulse ${
              isDark ? 'bg-blue-500' : 'bg-purple-500'
            }`}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: 0.1,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isDark 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg' 
              : 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg'
          }`}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`w-full max-w-md transition-all duration-500 transform ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-xl rounded-3xl shadow-2xl border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } hover:shadow-3xl`}>
          
          {/* Header */}
          <div className="text-center p-8 pb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              isDark ? 'bg-blue-600' : 'bg-purple-600'
            } animate-pulse`}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Verify Your Account
            </h1>
            
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } text-sm`}>
              Enter the 6-digit code sent to your device
            </p>
          </div>

          {/* OTP Input */}
          <div className="px-8 scale-75 lg:scale-100 pb-6">
            <div className="flex justify-center space-x-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:scale-105 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-purple-400 focus:bg-white'
                  } focus:outline-none focus:ring-2 ${
                    isDark ? 'focus:ring-blue-400' : 'focus:ring-purple-400'
                  } focus:ring-opacity-50`}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center space-x-2`}
            >{
                loading ?              <span>Verifying...</span> :              <span>Verify Code</span>

            }
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Footer */}
          <div className={`text-center p-6 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Didn't receive the code?
            </p>
            
            <button
              onClick={handleResend}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'text-blue-400 hover:bg-gray-700' 
                  : 'text-purple-600 hover:bg-gray-100'
              }`}
            >
              <RotateCcw size={16} />
              <span>Resend Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gridFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(1deg); }
          50% { transform: translate(-5px, 5px) rotate(-1deg); }
          75% { transform: translate(5px, 10px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  );
};

export default OTPPage;