import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await authService.token({ email, password });
    const accessToken = res?.result.accessToken;
    if (!accessToken) {
      toast.error("No has token from server! 😢");
      return;
    }
    const response = await authService.login(accessToken);
    toast.success("Login successful! 🎉");
    login(accessToken, response?.result.username, response?.result.role[0]?.name);

    navigate("/");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Login failed! 😢");
  }
};



  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] border border-cyan-500 rounded-2xl shadow-xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-cyan-400 fade-in-down">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-400 fade-in-down fade-delay-2">Log in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4 fade-in-down fade-delay-3">
          <div>
            <label className="block text-sm font-medium text-cyan-300 fade-in-down fade-delay-4">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 fade-in-down fade-delay-5"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-300 fade-in-down fade-delay-6">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 fade-in-down fade-delay-7"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:from-cyan-500 hover:to-cyan-700 transition duration-200 fade-in-down fade-delay-8"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 fade-in-down fade-delay-9">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline fade-in-down fade-delay-10">
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-center text-gray-400 fade-in-down fade-delay-9">
          Forgot password?{" "}
          <Link to="/retrieve" className="text-cyan-400 hover:underline fade-in-down fade-delay-10">
            Retrieve
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
