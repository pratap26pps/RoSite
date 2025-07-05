import React, { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    image: "",
  });
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("User in ProfileUpdate:", user);
 useEffect(() => {
  if (user) {
    const firstName = user.firstName || user.name?.split(" ")[0] || "";
    const lastName = user.lastName || user.name?.split(" ").slice(1).join(" ") || "";

    setFormData({
      firstName,
      lastName,
      mobile: user.mobile || "",
      image: user.image || "",
    });
  }
}, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append("image", file);

    try {
      setLoading2(true);
      const res = await axios.post("/api/upload", uploadForm);
      const imageUrl = res.data.url;
      console.log("Image uploaded successfully:", imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      dispatch(setUser( {
        ...user,
        image: imageUrl,
      }));
    
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Image upload failed:", err);
    
    }finally {
      setLoading2(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data before submit:", formData);

      const res = await axios.patch("/api/auth/update-profile", formData);
      toast.success(res.data.message || "Profile updated!");
      const updatedUser = {
        ...res.data.user,
        name: `${formData.firstName} ${formData.lastName}`,
      };
      dispatch(setUser(updatedUser));
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-20">
      <div className="w-full max-w-xl bg-blue-100 rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
       <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {loading2 && (
              <div className="mt-2 text-blue-600">Uploading image...</div>
            )}
            {formData.image && (
              <img
                src={formData?.image || user?.image || "/images/avatar.png"}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName || user?.firstName || ""}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName || user?.lastName || ""}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
