const features = [
  {
    title: "Real-time Crypto Tracking",
    description:
      "Stay updated with live prices, market trends, and portfolio tracking in real-time.",
  },
  {
    title: "Secure Wallet Integration",
    description:
      "Connect your crypto wallets safely with industry-leading encryption and authentication.",
  },
  {
    title: "Educational Resources",
    description:
      "Learn about blockchain, crypto trading strategies, and technology fundamentals easily.",
  },
  {
    title: "Cross-platform Support",
    description:
      "Access our platform via web and mobile to manage your assets anytime, anywhere.",
  },
];

const FeaturePage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-12">
        Features That Empower You
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-[#1e293b] rounded-xl p-6 shadow-lg hover:shadow-cyan-500/30 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-cyan-200 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePage;
