'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa';

const QuickContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch  {
      //console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl text-white" />,
      title: 'Email',
      value: 'contact@novatrix.dev',
      description: 'Nous répondons sous 24h'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-white" />,
      title: 'Localisation',
      value: 'Nouakchott, Mauritanie',
      description: 'Service disponible partout'
    },
    {
      icon: <FaClock className="text-2xl text-white" />,
      title: 'Support',
      value: 'Lun - Ven: 9h - 18h',
      description: 'Assistance en continu'
    }
  ];

  const socialMedia = [
    { name: 'Facebook', icon: <FaFacebookF />, color: 'hover:bg-[#1877F2]', url: "https://www.facebook.com/novatrix01" },
    { name: 'Instagram', icon: <FaInstagram />, color: 'hover:bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]', url: "https://www.instagram.com/novat_rix/" },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, color: 'hover:bg-[#0A66C2]', url: "https://www.linkedin.com/company/novatrix01/" },
    { name: 'Twitter', icon: <FaTwitter />, color: 'hover:bg-[#1DA1F2]', url: "https://x.com/Novatrix01" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#e87428]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e87428]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
              <span className="text-sm font-medium text-[#e87428]">
                Contact & Support
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Parlons de votre{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                prochain événement
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Vous avez des questions sur Eventick ? Souhaitez devenir partenaire ?
              Ou simplement discuter de votre prochain événement ? Nous sommes à votre écoute.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="group flex items-start space-x-4 p-6 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-[#e87428]/30 transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">{info.title}</h3>
                    <p className="text-[#e87428] font-medium text-lg mb-1">{info.value}</p>
                    <p className="text-gray-400 text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-white font-semibold mb-4 text-lg">Suivez-nous</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Restez connecté pour ne rien manquer de nos actualités
              </p>
              <div className="flex space-x-3">
                {socialMedia.map((social) => (
                  <Link href={social.url} key={social.name} target="_blank" rel="noopener noreferrer">
                    <button
                      className={`w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${social.color} shadow-lg`}
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Contact rapide</h3>
                <p className="text-gray-300">Remplissez ce formulaire et nous vous recontacterons rapidement.</p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-3">
                  <FaCheckCircle className="text-green-400 text-2xl" />
                  <div>
                    <p className="text-green-400 font-medium">Message envoyé avec succès !</p>
                    <p className="text-green-300 text-sm">Nous vous recontacterons rapidement.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3">
                  <FaTimesCircle className="text-red-400 text-2xl" />
                  <div>
                    <p className="text-red-400 font-medium">Erreur lors de {"l'envoi"}</p>
                    <p className="text-red-300 text-sm">Veuillez réessayer dans quelques instants.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder="Décrivez votre projet ou posez-nous vos questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:scale-110 transition-transform" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-sm">
                  Vos informations sont sécurisées et ne seront jamais partagées.
                </p>
              </form>
            </div>

            <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default QuickContactSection;
