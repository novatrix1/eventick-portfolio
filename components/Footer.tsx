// components/Footer.tsx
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaApple,
  FaGooglePlay,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/novatrix01", color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/novat_rix/", color: "hover:bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/novatrix01/", color: "hover:bg-[#0A66C2]" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://x.com/Novatrix01", color: "hover:bg-[#1DA1F2]" },
  ];

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "L'Application", href: "/application" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Confidentialité", href: "#" },
    { name: "Conditions", href: "#" },
    { name: "Cookies", href: "#" },
  ];

  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e87428]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#e87428]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/eventick.png"
                  alt="Logo Eventick"
                  fill
                  className="object-contain rounded-xl shadow-lg"
                  priority
                />
              </div>


            </div>

            <p className="text-gray-300 mb-6 max-w-lg text-lg leading-relaxed">
              La première application de billetterie 100% adaptée au marché mauritanien.
              Digitalisez vos événements en toute simplicité et sécurité.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  className={`group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${social.color}`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Liens rapides</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#e87428] transition-all duration-300 hover:translate-x-2 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#e87428] rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-3 group hover:text-[#e87428] transition-colors duration-300">
                <FaEnvelope className="text-xl" />
                <span>contact@novatrix.dev</span>
              </li>
              <li className="flex items-center space-x-3 group hover:text-[#e87428] transition-colors duration-300">
                <FaPhoneAlt className="text-xl" />
                <span>+222 47 35 02 65</span>
              </li>
              <li className="flex items-center space-x-3 group hover:text-[#e87428] transition-colors duration-300">
                <FaMapMarkerAlt className="text-xl" />
                <span>Nouakchott, Mauritanie</span>
              </li>
            </ul>


          </div>
        </div>

        {/* Séparateur bas */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Eventick. Tous droits réservés.
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-[#e87428] transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e87428] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Section App Store / Google Play */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">Bientot Disponible sur iOS et Android</div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105">
                <FaApple className="text-lg" />
                App Store
              </button>
              <button className="px-4 py-2 bg-linear-to-r from-[#e87428] to-[#ff9a3d] hover:shadow-lg rounded-xl text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105">
                <FaGooglePlay className="text-lg" />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
