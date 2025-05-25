import { useEffect, useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import appService from "../../../services/app.service";
import { Link } from "react-router-dom";

const DetectPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<[string, number][]>([]);
  const [heliusData, setHeliusData] = useState<Record<string, any> | null>(null);
  const [userHasToken, setUserHasToken] = useState(false);
  useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      if (token && username && role === "Vip") {
        setUserHasToken(true);
      }
  }, []);
  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setResult(null);
    const token = localStorage.getItem("accessToken");
  if (!token) {
    setResult("⚠️ You must be logged in to detect rug pulls.");
    return;
  }
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

  if (!solanaAddressRegex.test(address)) {
    setResult("⚠️ Invalid address format. Please enter a valid Solana wallet address.");
    return;
  }
  setLoading(true);
  try {
    const data = await appService.detectRugPull(address);
    setResult(data.AiModule?.prediction_message);
    setExplanation(data.AiModule?.lime_explanation || []);
    setHeliusData(data.helius || null);
  } catch (error:any) {
    setResult(error.response?.data?.message || "❌ Failed to analyze the address. Please try again later.");
    setHeliusData(null);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-16">
      <div className="max-w-xl mx-auto bg-[#1e293b] border border-cyan-500 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-cyan-400 uppercase text-center fade-in-down">
          <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
          Detect Rug Pull
        </h1>

        <p className="text-center text-sm text-gray-300 fade-in-down fade-delay-1">
          Paste the liquidity pool address below and check if it’s potentially a rug pull. We’ll run basic risk checks for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 fade-in-down fade-delay-2">
          <label className="block text-cyan-300 fade-in-down fade-delay-3">
            Enter Liquidity Pool Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white fade-in-down fade-delay-4"
              placeholder="0x..."
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-xl transition duration-300 font-semibold fade-in-down fade-delay-6"
          >
            {loading ? "Checking..." : "Check Rug Pull Risk"}
          </button>
        </form>

        {loading && (
          <p className="text-center text-yellow-300 fade-in-down fade-delay-7">Analyzing address...</p>
        )}

        {result && (
          <div className="text-center mt-4 p-4 border rounded bg-[#0f172a] border-cyan-700 text-sm text-white fade-in-down fade-delay-8">
            {result}
          </div>
        )}

        {userHasToken ? (
  <>
    <div className="bg-[#0f172a] border border-cyan-700 p-4 rounded-lg text-sm text-gray-300 mt-6 fade-in-down fade-delay-9">
      <h3 className="font-semibold text-cyan-400 mb-2 fade-in-down fade-delay-10">
        Common Rug Pull Indicators:
      </h3>
      <ul className="list-disc list-inside space-y-1 fade-in-down fade-delay-11">
        <li>Total Liquidity Added/Removed</li>
        <li>Add/Remove Ratio</li>
        <li>Pool Status (Active/Inactive)</li>
        <li>Lifetime Duration (First/Last Activity)</li>
        <li>Last Swap Details</li>
      </ul>
    </div>

    <div className="bg-[#0f172a] border border-cyan-700 p-4 rounded-lg text-sm text-gray-300 mt-6 fade-in-down fade-delay-12">
      <Link to="/getlpa">
        <h3 className="font-semibold flex justify-center text-cyan-400 mb-2 fade-in-down fade-delay-13 hover:underline cursor-pointer">
          How to get Liquidity Pool Address
        </h3>
      </Link>
      {explanation.length > 0 && (
  <div className="bg-[#0f172a] border border-cyan-700 p-4 rounded-lg text-sm text-gray-300 mt-6 fade-in-down fade-delay-14">
    <h3 className="font-semibold text-cyan-400 mb-2">Explanation Table:</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-600 text-left">
        <thead>
          <tr className="bg-cyan-700 text-white">
            <th className="border border-gray-600 px-4 py-2">Feature</th>
            <th className="border border-gray-600 px-4 py-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          {explanation.map(([feature, weight], index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td className="border border-gray-600 px-4 py-2">{feature}</td>
              <td className="border border-gray-600 px-4 py-2">{weight.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{heliusData && (
  <div className="bg-[#0f172a] border border-cyan-700 p-4 rounded-lg text-sm text-gray-300 mt-6 fade-in-down fade-delay-15">
    <h3 className="font-semibold text-cyan-400 mb-2">Helius Metrics:</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-600 text-left">
        <thead>
          <tr className="bg-cyan-700 text-white">
            <th className="border border-gray-600 px-4 py-2">Metric</th>
            <th className="border border-gray-600 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(heliusData).map(([key, value], index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td className="border border-gray-600 px-4 py-2">{key}</td>
              <td className="border border-gray-600 px-4 py-2">
                {typeof value === "number" ? value.toFixed(6) : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{(explanation.length > 0 || heliusData) && (
  <Link to="/definition">
    <h3 className="font-semibold flex justify-center text-cyan-400 mt-6 fade-in-down fade-delay-16 hover:underline cursor-pointer">
      Definition
    </h3>
  </Link>
)}

    </div>
      
  </>
) : (
  <div className="text-center mt-6 fade-in-down fade-delay-9">
    <p className="mb-2 text-sm text-gray-300">Want more detailed info about LP analysis?</p>
    <a
      href="/premium"
      className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition"
    >
      More Information About Liquidity Pool Address
    </a>
  </div>
)}

      </div>
    </div>
  );
};

export default DetectPage;
