import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-20 flex flex-col items-center justify-center relative">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 fade-in-down">
        ANTI RUG PULLING
      </h1>
      <p className="mt-6 max-w-2xl text-center text-gray-300 text-lg fade-in-down fade-delay-2">
        Your trusted decentralized crypto platform to prevent fraud and secure your investments.
      </p>
      <div className="mt-10 fade-in-down fade-delay-4">
        <Link
          to="/detect"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl shadow-lg transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
