import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BiArrowFromRight } from "react-icons/bi";
import toast from "react-hot-toast";

const OtpPage = () => {
  const router = useRouter();
  const [pendingSignup, setPendingSignup] = useState({});
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setotp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pendingSignup");
      if (stored) {
        setPendingSignup(JSON.parse(stored));
      }
    }
  }, []);

  const handleonsubmit = async (e) => {
    e.preventDefault();
    if (!otp || !email) {
      toast.error("Missing email or OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        ...pendingSignup,
        code: otp,
      });

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP or email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:scale-125 bg-blue-200 text-black px-4">
      {loading ? (
        <p className="text-xl font-semibold">Verifying...</p>
      ) : (
        <div className="w-full max-w-md bg-blue-100 shadow-lg rounded-2xl px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Verify Email</h1>
          <p className="text-sm text-gray-600 mb-6">
            A verification code has been sent to your email. Enter it below to verify.
          </p>

          <form className="my-4 space-y-6" onSubmit={handleonsubmit}>
            <div className="flex py-3 justify-center">
              <OTPInput
              
                inputStyle="scale-200 border border-gray-400 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="otp"
                inputType="text"
                value={otp}
                onChange={setotp}
                numInputs={6}
                renderSeparator={<span className="px-4">-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 cursor-pointer scale-90 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <Link href="/signup">
            <div className="flex justify-center items-center mt-4 text-blue-600 hover:underline text-sm font-medium">
              <BiArrowFromRight className="mr-1" />
              <p>Back to Signup</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
