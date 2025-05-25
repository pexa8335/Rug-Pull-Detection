import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

export default function GetLPAPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-cyan-600/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400">
            How to Find a Liquidity Pool Address
          </h1>
        </div>

        <p className="mb-8 text-lg text-gray-400 leading-relaxed">
          To find the Liquidity Pool (LP) address for a token, which is essential for using tools like our Rug Pull Detector, follow these steps:
        </p>

        <ol className="list-decimal list-inside space-y-8 text-gray-300 text-base sm:text-lg">
          <li className="leading-relaxed">
            Visit a reputable pair explorer like{" "}
            <a
              href="https://www.dextools.io/app/en/pairs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 transition-colors duration-200"
            >
              DEXTools.io Pairs <FaExternalLinkAlt size={14} />
            </a>
            . There are other explorers like DexScreener, choose one you trust.
          </li>
          <li className="leading-relaxed">
            Search for the trading pair you're interested in. For example, if you are looking for a token named "ExampleToken" often paired with WETH (Wrapped Ether), you might search for{" "}
            <strong className="text-white font-semibold">ExampleToken/WETH</strong>.
            Make sure you are on the correct blockchain network (e.g., Ethereum, BNB Chain, etc.).
          </li>
          <li className="leading-relaxed">
            Once you find the pair, the explorer will typically display several pieces of information. You're looking for two key addresses (using Uniswap V2/Pancakeswap V2 style explorers as an example):
            <ul className="list-disc list-outside ml-8 mt-4 space-y-5 text-gray-400">
              <li>
                <span className="font-semibold text-white">Token Contract:</span> This is the contract address of the specific token itself (e.g., ExampleToken).
                <div className="bg-slate-900 text-cyan-300 text-sm font-mono p-3 my-2 rounded-md overflow-x-auto w-full break-all shadow-inner">
                  {/* Example Address - Replace with a generic placeholder if needed */}
                  0x123abc0000000000000000000000000000000token
                </div>
              </li>
              <li>
                <span className="font-semibold text-white">Pair Contract (or LP Address):</span> This is the Liquidity Pool address that you need for the detector. It represents the contract managing the liquidity for that specific trading pair.
                <div className="bg-slate-900 text-cyan-300 text-sm font-mono p-3 my-2 rounded-md overflow-x-auto w-full break-all shadow-inner">
                  {/* Example Address - Replace with a generic placeholder if needed */}
                  0x456def0000000000000000000000000000000pair
                </div>
                <p className="text-sm text-cyan-500 mt-1">
                  <strong className="text-cyan-400">This is the address you need to copy.</strong>
                </p>
              </li>
            </ul>
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Copy the Pair Contract address</strong> carefully. This is what you'll paste into the "Enter Liquidity Pool Address" field on the detector page.
          </li>
        </ol>

        <div className="mt-12 text-center">
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
          >
            <FaArrowLeft size={18} />
            Back to Detector
          </Link>
        </div>
      </div>
    </div>
  );
}