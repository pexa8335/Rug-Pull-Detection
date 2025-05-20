import { Link } from "react-router-dom";

const RugPullPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-16">
      <div className="max-w-3xl mx-auto bg-[#1e293b] border border-cyan-500 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-cyan-400 text-center uppercase">
          Rug Pull Scams
        </h1>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            What is a Rug Pull?
          </h2>
          <p className="text-gray-300">
            A rug pull is a cryptocurrency investment scam where the creators or developers of a cryptocurrency project suddenly abandon the project or exit scam, taking all the funds invested by users with them. The name originates from the idea of pulling the rug out from under investors’ feet, leaving them with worthless tokens or losing their investments entirely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            Common Types of Rug Pull Scams
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Fake Coin Launches:</strong> Fraudsters create a new cryptocurrency token and promote it through social media, forums, or websites, claiming it has a promising future or unique features. Once investors buy the token, the creators disappear with the funds.
            </li>
            <li>
              <strong>Exit Scams:</strong> Projects or exchanges that operate legitimately for a period before abruptly shutting down and disappearing with investors’ funds.
            </li>
            <li>
              <strong>Yield Farming Scams:</strong> Fraudsters create fake DeFi projects or pools, promising high returns to investors who provide liquidity. After investors deposit funds, the creators withdraw the liquidity and disappear.
            </li>
            <li>
              <strong>DeFi Project Rug Pulls:</strong> Creators deploy a smart contract for a DeFi protocol, attract investors to deposit their funds or tokens, and then exploit vulnerabilities in the smart contract to drain the funds and abscond with them.
            </li>
            <li>
              <strong>Ponzi Schemes:</strong> Promise high returns to early investors using funds from later investors. Eventually, the scheme collapses when there are not enough new investors to pay returns to earlier investors.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            Hard vs. Soft Rug Pulls
          </h2>
          <p className="text-gray-300">
            <strong>Hard Rug Pull:</strong> Developers or administrators completely and suddenly disappear, taking all the funds invested in the project with them. The project's website, social media channels, and any other communication channels are taken down, leaving investors with no way to contact or locate the perpetrators.
          </p>
          <p className="text-gray-300 mt-2">
            <strong>Soft Rug Pull:</strong> Involves a more gradual or subtle exit strategy. The project's administrators may gradually reduce their involvement, decreasing updates or communication with the community. They may have been siphoning off funds over time, rather than in one sudden move.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            NFT Rug Pulls
          </h2>
          <p className="text-gray-300">
            Rug pulls can happen with NFTs (Non-Fungible Tokens) in various ways:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
            <li>
              <strong>Fake NFT Projects:</strong> Scammers create fake NFT projects claiming to offer unique digital artworks or collectibles. Once buyers purchase the NFTs, the scammers disappear with the funds.
            </li>
            <li>
              <strong>Pseudo-NFT Platforms:</strong> Platforms or marketplaces claiming to sell NFTs may turn out to be fraudulent, failing to transfer ownership rights or misrepresenting the NFTs.
            </li>
            <li>
              <strong>NFT Collections with No Value:</strong> Scammers create large collections of NFTs and promote them as valuable or rare, but they lack artistic or intellectual value.
            </li>
            <li>
              <strong>Exit Scams on NFT Marketplaces:</strong> Operators suddenly shut down the platform and disappear with funds held in escrow or with platform fees paid by users.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            What is an “Unruggable” Project?
          </h2>
          <p className="text-gray-300">
            An “unruggable” project is a cryptocurrency or decentralized finance (DeFi) project that is perceived as resistant to rug pulls or exit scams. Characteristics include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
            <li><strong>Transparency:</strong> Developers are known and publicly identifiable.</li>
            <li><strong>Locked Liquidity:</strong> Liquidity is locked through smart contracts for a specified period.</li>
            <li><strong>Renounced Ownership:</strong> Developers relinquish control over the smart contracts.</li>
            <li><strong>Community Governance:</strong> Decisions are made by a decentralized community of token holders.</li>
            <li><strong>Audited Contracts:</strong> Smart contracts undergo thorough security audits by reputable firms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            Legal Status of Rug Pulls
          </h2>
          <p className="text-gray-300">
            Rug pull scams can be charged as illegal activities, but it depends on where and how they happen. They may violate:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
            <li><strong>Securities Laws:</strong> If the rug pull involves the sale of securities.</li>
            <li><strong>Anti-Money Laundering (AML) and Know Your Customer (KYC) Regulations:</strong> If exchanges or platforms involved are laundering illegal funds.</li>
            <li><strong>Consumer Protection Laws:</strong> Including laws related to unfair or deceptive trade practices and consumer fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            How to Detect and Avoid Rug Pulls
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Conduct Thorough Research:</strong> Investigate the project's website, whitepaper, team members, and community forums.</li>
            <li><strong>Verify the Team:</strong> Ensure that the developers are real and have a credible track record.</li>
            <li><strong>Check Community Engagement:</strong> Evaluate the level of community activity and transparency.</li>
            <li><strong>Review the Tokenomics:</strong> Examine token distribution and supply.</li>
            <li><strong>Audit Smart Contracts:</strong> Look for projects with security audits by reputable firms.</li>
            <li><strong>Watch for Red Flags:</strong> Be cautious of anonymous teams, guaranteed returns, and lack of a clear roadmap.</li>
            <li><strong>Avoid Unverified Projects:</strong> Stick to projects with established reputations.</li>
            <li><strong>Stay Informed:</strong> Follow reliable sources for the latest developments in the crypto space.</li>
            <li><strong>Trust Your Instincts:</strong> If something feels off, it's better to err on the side of caution.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            AI’s Role in Fighting Rug Pull Scams
          </h2>
          <p className="text-gray-300">
            Artificial Intelligence (AI) can play a significant role in combating rug pull scams by enhancing detection, analysis, and prevention efforts. Through pattern recognition and unsupervised machine learning, AI can analyze vast amounts of data to identify anomalies associated with rug pull scams. Natural language processing enables AI to understand textual data from various sources, aiding in faster detection and response.
          </p>
        </section>

        <div className="text-center mt-8">
          <Link
            to="/detect"
           className="inline-block bg-cyan-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-600 transition duration-300"
          >
            Detect Rug Pull
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RugPullPage;
