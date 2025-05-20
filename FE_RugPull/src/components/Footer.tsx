import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const footerLinks = [
    {
      title: "Contact",
      links: [
        { label: "Email", path: "/contact" },
        { label: "Phone", path: "/contact" },
        { label: "Address", path: "/contact" },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "Our Mission", path: "/about" },
        { label: "Team", path: "/about" },
        { label: "Careers", path: "/about" },
      ],
    },
    {
      title: "FAQ",
      links: [
        { label: "General", path: "/faq" },
        { label: "Security", path: "/faq" },
        { label: "Usage", path: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "🌐", path: "https://facebook.com" },
    { name: "Twitter", icon: "🐦", path: "https://twitter.com" },
    { name: "YouTube", icon: "📺", path: "https://youtube.com" },
    { name: "Instagram", icon: "📷", path: "https://instagram.com" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/screenshots/logo.jpg"
              alt="RUGPULL Logo"
              className="h-10 object-contain mb-2"
            />
          </Link>
          <p className="text-sm text-gray-300">
            The World’s Leading Cryptocurrency Platform
          </p>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-2 text-white">{section.title}</h4>
            <ul className="space-y-1">
              {section.links.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className={`text-sm transition hover:text-white ${
                      location.pathname === path ? "text-cyan-400 underline" : "text-gray-300"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        {/* Socials */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.path}
              className="text-xl hover:text-white"
              aria-label={s.name}
              title={s.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Crypto.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
