'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaCreditCard, FaChartBar, FaQrcode } from 'react-icons/fa'; // Icônes importées

const FeaturesOverviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FaSearch className="text-3xl" />,
      title: "Exploration d'événements",
      description:
        "Découvrez tous les événements autour de vous avec notre moteur de recherche intelligent et nos filtres avancés.",
      gradient: 'from-[#e87428] to-[#ff9a3d]',
      details: [
        'Recherche par localisation',
        'Filtres par catégorie et date',
        'Recommandations personnalisées',
        'Événements tendances',
      ],
      animation: 'hover:rotate-3 transform-gpu',
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: 'Paiement local sécurisé',
      description:
        'Payez en toute sécurité avec les méthodes de paiement locales les plus populaires en Mauritanie.',
      gradient: 'from-[#e87428] to-[#ff9a3d]',
      details: [
        'Mobile Banking local intégrés',
        'Confirmation instantanée',
        'Paiement en 3 clics',
        'Support 24/7',
      ],
      animation: 'hover:scale-105 transform-gpu',
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: 'Gestion organisateur',
      description:
        'Dashboard complet pour créer, gérer et analyser vos événements en temps réel.',
      gradient: 'from-[#e87428] to-[#ff9a3d]',
      details: [
        "Création d'événements simplifiée",
        'Analytics en direct',
        'Gestion des billets',
        'Communication intégrée',
      ],
      animation: 'hover:-translate-y-2 transform-gpu',
    },
    {
      icon: <FaQrcode className="text-3xl" />,
      title: 'Scan QR code',
      description:
        'Validation rapide et sécurisée des billets avec notre système de scan QR code unique.',
      gradient: 'from-[#e87428] to-[#ff9a3d]',
      details: [
        'QR codes uniques',
        'Validation hors ligne',
        'Historique des scans',
        "Rapports d'entrée",
      ],
      animation: 'hover:rotate-2 transform-gpu',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#e87428]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#e87428]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
            <span className="text-sm font-medium text-[#e87428]">
              Fonctionnalités Clés
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Des fonctionnalités{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
              pensées pour vous
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les principales fonctionnalités qui font {"d'Eventick"} la solution de billetterie
            la plus complète et adaptée au marché mauritanien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-700/50 hover:border-[#e87428]/30 ${
                feature.animation
              } ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#e87428] to-[#ff9a3d] opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500"></div>

              <div className="absolute top-0 left-6 right-6 h-1 bg-linear-to-r from-transparent via-[#e87428] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {feature.icon}
                <div className="absolute inset-0 rounded-2xl bg-white/20 transform rotate-12 scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#e87428] transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    <div className="w-5 h-5 bg-[#e87428]/20 rounded-full flex items-center justify-center mr-3 shrink-0 group-hover:bg-[#e87428]/30 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-[#e87428] rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    </div>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverviewSection;
