import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Highlight = ({ children }: any) => (
  <span className="bg-yellow-400 text-black px-1 rounded-sm font-semibold">
    {children}
  </span>
);

export default function DefinitionPage() {
  return (
    <div className="min-h-screen mt-4 bg-slate-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-cyan-600/50">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 text-center sm:text-left">
            Explanation Breakdown
          </h1>
        </div>

        <div className="space-y-8 text-gray-300 text-base sm:text-lg">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Anomaly Score:</h2>
            <p className="leading-relaxed text-gray-400">
              Our system uses an <Highlight>Isolation Forest</Highlight> model to detect anomalies by assigning an <Highlight>anomaly score</Highlight> to each transaction.
              <br />
              The interpretation is simple:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-300 space-y-1">
              <li>
                <Highlight>More negative</Highlight> score → higher chance of being an <Highlight>anomaly</Highlight>.
              </li>
              <li>
                Score near zero or <Highlight>positive</Highlight> → more likely to be a <Highlight>normal</Highlight> transaction.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">LIME Feature Weights:</h2>
            <p className="leading-relaxed text-gray-400 mb-4">
              Each row in the LIME explanation table shows a feature and its associated <Highlight>weight</Highlight>. This weight tells us how that feature affected the anomaly score.
            </p>
            <div className="space-y-3">
              <p>
                <Highlight>Negative Weight</Highlight> (e.g., -0.002610): pushes the score more negative → increases anomaly likelihood.
              </p>
              <p>
                <Highlight>Positive Weight</Highlight> (e.g., 0.000686): makes the score less negative or more positive → supports the transaction being normal.
              </p>
              <p>
                <Highlight>Impact Strength</Highlight>: The <i>absolute value</i> of the weight shows how strong the influence is.
                <br />
                For example, a weight of <Highlight>-0.004618</Highlight> has a stronger impact than <Highlight>-0.001749</Highlight>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
          >
            <FaArrowLeft size={18} />
            Back to DetectPage
          </Link>
        </div>
      </div>
    </div>
  );
}
