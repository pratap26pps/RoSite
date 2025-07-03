import React, { useState ,useEffect} from "react";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useRouter,useSearchParams } from "next/navigation";
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
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem("pendingSignup");
    if (stored) {
      setPendingSignup(JSON.parse(stored));
    }
  }
}, []);
  const handleonsubmit =async (e) => {
 
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
        router.push("/login");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP or email. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      {loading ? (
        "loading...."
      ) : (
        <div className="min-h-screen py-32 text-black flex flex-col items-center bg-blue-200">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center
           text-gray-500 ">Verify Email</h1>
          <p className="w-90 mx-0 my-5">
            A verification code has been sent to you Enter the code below.
          </p>
          <form className="scale-100  my-8" onSubmit={handleonsubmit}>
            <div className="scale-200 ml-10">
            <OTPInput
            inputStyle="border  border-gray-400 rounded-md text-center text-xl focus:outline-none focus:border-blue-500 "
              name="otp"
              inputType="text"
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            </div>

            <button
              type="submit"
              className="px-8 mt-10 py-4 text-lg sm:text-xl font-semibold rounded-2xl shadow-md
               bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 
               dark:bg-blue-500 dark:hover:bg-blue-600"
            >
             {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <Link href="/signup">
            <div className="flex mt-6 -ml-6">
              <BiArrowFromRight className="mt-1" />
              <p>back to signup</p>
            </div>
          </Link>
          {/* <button className="mt-3 -ml-6" onClick={() => resendhandler(email)}>
            Resend it
          </button> */}
        </div>
      )}
    </div>
  );
};

export default OtpPage;
