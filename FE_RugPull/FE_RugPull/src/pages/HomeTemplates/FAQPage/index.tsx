import { useState } from "react";

const faqs = [
  {
  question: "What is ANTI RUG PULLING?",
  answer:
    "It is a platform designed to protect users from scam crypto projects by providing transparent information and project auditing tools.",
},
{
  question: "How can I know if a project is trustworthy?",
  answer:
    "We offer a scoring system based on technical criteria, community engagement, and project development history.",
},
{
  question: "Do I need an account to use the platform?",
  answer:
    "Not necessarily. You can view information for free. However, to rate or follow projects, you need to sign in.",
},
{
  question: "Is there a mobile app?",
  answer:
    "We are currently developing a mobile version, which will be released soon.",
}

];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-20">
      <div className="max-w-4xl mx-auto fade-in-down fade-delay-2">
        <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center fade-in-down fade-delay-4">
          Frequently Asked Questions (FAQ)
        </h1>
        <div className="space-y-4 fade-in-down fade-delay-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-cyan-500 rounded-lg p-4 bg-[#1e293b]"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-lg font-semibold text-cyan-200 hover:text-cyan-400 transition"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
