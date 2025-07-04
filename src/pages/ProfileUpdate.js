import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";  

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        const user = res.data.user;
        const parts = user.name.split(" ");
        const firstName = parts.slice(0, 1).join(" ") || "";
        const lastName = parts.slice(1).join(" ") || "";

        console.log("User data in profile update:", user);
        console.log("firstName data:", firstName);
        console.log("lastName data:", lastName);

        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          mobile: user.mobile || "",
          image: user.image || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

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
      const res = await axios.post("/api/upload", uploadForm);
      const imageUrl = res.data.url;
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      dispatch(setUser((prev) => ({
      ...prev,
      image: imageUrl,
    })));

      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
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
              value={formData.lastName}
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

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
              />
            )}
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
