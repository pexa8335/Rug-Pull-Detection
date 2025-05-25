import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    phonenumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    try {
      await authService.register(form);
      toast.success("Sign Up successful! 🎉");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // chờ 2s để user thấy thông báo
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Sign Up failed! 😢");
    }
  };

  return (
    <div>
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] rounded-2xl shadow-xl max-w-md w-full p-8 space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center text-cyan-300 fade-in-down">
          Create an Account 📝
        </h2>
        <p className="text-center text-gray-400 fade-in-down fade-delay-1">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4 fade-in-down fade-delay-2">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 fade-in-down fade-delay-3">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 fade-in-down fade-delay-4"
              placeholder="vanquoc06@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 fade-in-down fade-delay-5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 fade-in-down fade-delay-6"
              placeholder="*****"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 fade-in-down fade-delay-7">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 fade-in-down fade-delay-8"
              placeholder="vanquoc0201"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 fade-in-down fade-delay-9">
              Phone Number
            </label>
            <input
              type="text"
              name="phonenumber"
              required
              value={form.phonenumber}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 fade-in-down fade-delay-10"
              placeholder="0123456789"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:from-cyan-500 hover:to-cyan-700 transition duration-200 fade-in-down fade-delay-11"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 fade-in-down fade-delay-12">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline fade-in-down fade-delay-13">
            Log In
          </Link>
        </p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUpPage;
