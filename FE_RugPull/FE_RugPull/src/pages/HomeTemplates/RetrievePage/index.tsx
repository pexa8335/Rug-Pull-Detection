import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RetrievePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.post("/api/retrieve-password", { email });
      if (res.status === 200) {
        setMessage("Password has been sent to your email.");
        navigate("/login"); 
      } else {
        setError("Failed to retrieve password. Please try again later.");
      }
    } catch (err : any) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
          Retrieve Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white text-sm block mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Password to Email"}
          </button>

          {message && (
            <p className="text-green-400 text-sm text-center mt-2">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RetrievePage;
