const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-cyan-400">
          About ANTI RUG PULLING
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          <span className="font-semibold text-cyan-400">ANTI RUG PULLING</span> is a
          community-driven initiative to combat one of the most common and damaging scams in
          the cryptocurrency world — rug pulls. Our mission is to increase transparency,
          raise awareness, and provide tools that help investors make safer decisions in
          decentralized finance.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] rounded-xl border border-cyan-500 p-6 hover:border-cyan-400 transition">
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">🔍 Transparency First</h2>
            <p className="text-gray-300">
              We aim to shine light on suspicious projects and educate users about key signs of fraud in Web3.
            </p>
          </div>
          <div className="bg-[#1e293b] rounded-xl border border-cyan-500 p-6 hover:border-cyan-400 transition">
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">🛡️ Empowering Investors</h2>
            <p className="text-gray-300">
              By offering a platform with tracking tools, research data, and tutorials, we help users make safer investment decisions.
            </p>
          </div>
          <div className="bg-[#1e293b] rounded-xl border border-cyan-500 p-6 hover:border-cyan-400 transition">
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">🤝 Community Driven</h2>
            <p className="text-gray-300">
              Everything we build is in collaboration with the crypto community. We listen. We adapt. We evolve.
            </p>
          </div>
          <div className="bg-[#1e293b] rounded-xl border border-cyan-500 p-6 hover:border-cyan-400 transition">
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">🚀 Built for the Future</h2>
            <p className="text-gray-300">
              Though early in development, we are laying the foundation for a safer DeFi ecosystem, one step at a time.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-400">
            Want to be part of the journey? Follow us or contact our team to learn more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
