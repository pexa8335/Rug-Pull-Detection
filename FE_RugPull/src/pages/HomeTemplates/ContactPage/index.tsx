const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-[#1e293b] border border-cyan-500 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          Contact Us
        </h1>
        <p className="text-gray-400 text-center">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-cyan-300 font-semibold">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-[#0f172a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-cyan-300 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-[#0f172a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-cyan-300 font-semibold">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-[#0f172a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
             className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:from-cyan-500 hover:to-cyan-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
