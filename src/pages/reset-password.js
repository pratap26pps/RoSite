"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {

  const router = useRouter();
  const { token, email } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successful. You can now log in.");
        router.push("/login");
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-100 shadow-lg p-8 rounded-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full p-3 border border-gray-900 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full p-3 border border-gray-900 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
