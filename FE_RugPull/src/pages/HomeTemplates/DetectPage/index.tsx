import { useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

const DetectPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Giả lập kiểm tra
    setTimeout(() => {
      setLoading(false);
      setResult(
        address.includes("bad") // ví dụ đơn giản để test
          ? "⚠️ Warning: This pool has risky characteristics. Be careful!"
          : "✅ This pool seems safe. No rug pull detected."
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-16">
      <div className="max-w-xl mx-auto bg-[#1e293b] border border-cyan-500 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-cyan-400 uppercase text-center">
          <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
          Detect Rug Pull
        </h1>

        <p className="text-center text-sm text-gray-300">
          Paste the liquidity pool address below and check if it’s potentially a rug pull. We’ll run basic risk checks for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-cyan-300">
            Enter Liquidity Pool Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
              placeholder="0x..."
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-xl transition duration-300 font-semibold"
          >
            {loading ? "Checking..." : "Check Rug Pull Risk"}
          </button>
        </form>

        {loading && (
          <p className="text-center text-yellow-300">Analyzing address...</p>
        )}

        {result && (
          <div className="text-center mt-4 p-4 border rounded bg-[#0f172a] border-cyan-700 text-sm text-white">
            {result}
          </div>
        )}

        <div className="bg-[#0f172a] border border-cyan-700 p-4 rounded-lg text-sm text-gray-300 mt-6">
          <h3 className="font-semibold text-cyan-400 mb-2">
            Common Rug Pull Indicators:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Liquidity is not locked or unlocks soon</li>
            <li>High slippage or high sell tax (e.g. {'>'} 20%)</li>
            <li>Contract is not verified or unaudited</li>
            <li>Developer wallet holds too much supply</li>
            <li>Admin has mint/burn privileges</li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
