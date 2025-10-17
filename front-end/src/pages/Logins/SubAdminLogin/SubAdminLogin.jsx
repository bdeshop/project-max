import React, { useContext, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router";

const SubAdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validationInput, setValidationInput] = useState("");
  const [code, setCode] = useState(generateCode());
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔢 র‍্যান্ডম ৪ ডিজিট কোড তৈরি
  function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // 🔁 কোড রিফ্রেশ
  const handleRefresh = () => setCode(generateCode());

  // 🚀 সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ কোড চেক
    if (validationInput != code) {
      toast.error("Validation code mismatch!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admins/as-login`,
        { userName, password }
      );

      const data = res.data;

      // ✅ লগইন সফল হলে
      if (data?.user) {
        login(data.user); // context + localStorage এ ইউজার সেভ
        toast.success("Login successful!");

        if (data.user.role === "SA") {
          navigate("/sa/sub-admin");
        } else {
          toast.error("You do not have permission to access this page!");
          navigate("/restricted");
        }
      }
    } catch (error) {
      // ⚠️ ব্যাকএন্ডের এরর হ্যান্ডেল
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900">
      <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl w-[90%] max-w-4xl border border-gray-700">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-sky-700 to-blue-900 p-8">
          <img
            src="https://i.ibb.co/w0xFBM8/agent-login.png"
            alt="Agent Login"
            className="w-60 mb-6"
          />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Sub Admin Portal
          </h1>
          <p className="text-gray-300 mt-2 text-center text-sm">
            Manage your clients and deposits securely.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-black/60">
          <h2 className="text-center text-white text-2xl font-semibold mb-6">
            Sub Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />

            {/* Validation Code */}
            <div className="flex items-center">
              <input
                type="text"
                required
                value={validationInput}
                onChange={(e) => setValidationInput(e.target.value)}
                placeholder="Validation Code"
                className="flex-1 px-4 py-2 bg-transparent border border-gray-500 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span className="px-4 py-2 bg-white text-black font-bold border border-gray-500">
                {code}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                className="px-4 py-2 cursor-pointer bg-sky-600 hover:bg-sky-700 rounded-r-lg flex items-center justify-center"
              >
                <FaSyncAlt size={24} className="text-white" />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer py-2 bg-gradient-to-r from-sky-700 to-blue-600 hover:opacity-90 text-white font-semibold rounded-lg transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubAdminLogin;
