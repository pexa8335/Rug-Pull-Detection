import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const plans = [
  {
    title: "Free",
    price: "$0",
    subtext: "USD/month",
    features: [
      "Check Liquidity Pool address 1 time/day",
      "No historical activity data",
      "No liquidity ratio analysis",
      "No swap detail access",
    ],
    highlight: false,
    borderColor: "border-gray-600",
    textColor: "text-gray-300",
    button: null,
  },
  {
    title: "Pro",
    price: "$3.00",
    subtext: "USD/month",
    features: [
      "Unlimited Liquidity Pool checks",
      "Total Liquidity Added/Removed",
      "Add/Remove Ratio",
      "Pool Status (Active/Inactive)",
      "Lifetime Duration (First/Last Activity)",
      "Last Swap Details",
    ],
    highlight: true,
    borderColor: "border-yellow-400",
    textColor: "text-cyan-100",
    button: (
      <Link
        to="/checkout"
        className="inline-block bg-cyan-400 hover:bg-cyan-500 text-[#0f172a] font-bold px-6 py-2 rounded-xl transition"
      >
        Upgrade to Pro
      </Link>
    ),
  },
  {
  title: "LegitCheck",
  price: "$5,000",
  subtext: "USD (one-time)",
  features: [
    "Tailored for launchpad tokens", "High-stake DeFi projects",
    "Includes in-depth smart contract audit", "Project legitimacy assessment", "Risk scoring",
    "For pre-launch credibility",
  ],
  highlight: false,
  borderColor: "border-red-500",
  textColor: "text-red-300",
  button: (
    <div className="space-y-2">
      <a
        href="mailto:support@legitcheck.ai?subject=Request%20LegitCheck%20Audit"
        className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-xl transition"
      >
        Contact for LegitCheck
      </a>
      <div className="text-xs text-red-300 font-semibold border border-red-500 rounded-xl px-4 py-1 inline-block">
        Suitable For Only Business
      </div>
    </div>
  ),
}

];

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            Choose Your Plan
          </h1>
          {/* This paragraph defaults to text-base if no specific size is set, which is 1rem */}
          <p className="text-gray-300">
            Gain deeper insights and tracking on Liquidity Pools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border shadow-xl bg-[#0f172a] space-y-4 ${
                plan.highlight ? "scale-105 border-cyan-400" : plan.borderColor
              } transition duration-300`}
            >
              <h2
                className={`text-2xl font-semibold ${
                  plan.highlight ? "text-cyan-300" : plan.textColor
                }`}
              >
                {plan.title}
              </h2>
              <div className="text-3xl font-bold">
                {plan.price}{" "}
                {/* This span is explicitly text-base */}
                <span className="text-base font-normal">{plan.subtext}</span>
              </div>
              {/* Changed text-sm to text-base here for feature list */}
              <ul className={`space-y-2 text-base ${plan.textColor}`}>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">{plan.button}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-500 mt-10">
          Cancel anytime. Secure payments powered by Stripe.
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;