export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white px-6 py-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        ANTI RUG PULLING
      </h1>
      <p className="mt-6 max-w-2xl text-center text-gray-300 text-lg">
        Your trusted decentralized crypto platform to prevent fraud and secure your investments.
      </p>
      <div className="mt-10">
        <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl shadow-lg transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
