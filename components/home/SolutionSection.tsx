'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaLock, FaMobileAlt, FaFlag} from 'react-icons/fa';

const SolutionSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const pillars = [
        {
            icon: <FaLock className="text-2xl" />,
            title: 'Sécurisé',
            description: 'QR codes uniques, organisateurs vérifiés',
            features: [
                "QR codes cryptés et infalsifiables",
                "Validation d'identité des organisateurs",
                "Historique de traçabilité complet",
            ],
            gradient: 'from-[#e87428] to-[#ff9a3d]',
        },
        {
            icon: <FaMobileAlt className="text-2xl" />,
            title: 'Simple',
            description: 'Paiement en 3 clics, interface intuitive',
            features: [
                "Processus d'achat simplifié",
                "Interface utilisateur conviviale",
                "Paiement rapide et sécurisé",
                "Gestion centralisée des billets",
            ],
            gradient: 'from-[#e87428] to-[#ff9a3d]',
        },
        {
            icon: <FaFlag className="text-2xl" />,
            title: 'Local',
            description: 'Intégration Mobile Banking',
            features: [
                "Paiements adaptés au marché mauritanien",
                "Support en langue locale",
                "Assistance client locale",
            ],
            gradient: 'from-[#e87428] to-[#ff9a3d]',
        },
    ];

    const paymentMethods = [
        { name: "Bankily", logo: "/images/bankily.png" },
        { name: "Masrvi", logo: "/images/masrvi.png" },
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#e87428]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e87428]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
                        <span className="text-sm font-medium text-[#e87428]">
                            Solution Complète
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Eventick{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                            révolutionne
                        </span>{' '}
                        vos événements
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Une plateforme complète qui répond aux besoins spécifiques du marché mauritanien
                        en combinant technologie moderne et adaptation locale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 hover:border-[#e87428]/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{
                                transitionDelay: `${index * 200}ms`,
                            }}
                        >
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#e87428] to-[#ff9a3d] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                            <div className="absolute top-0 left-8 right-8 h-1 bg-linear-to-r from-transparent via-[#e87428] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div
                                className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${pillar.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                            >
                                {pillar.icon}
                                <div className="absolute inset-0 rounded-2xl bg-white/20 transform rotate-12 scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                            <p className="text-lg font-semibold text-[#e87428] mb-6">{pillar.description}</p>

                            <ul className="space-y-4">
                                {pillar.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start space-x-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                                    >
                                        <div className="w-6 h-6 bg-[#e87428]/20 rounded-full flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-[#e87428]/30 transition-colors duration-300">
                                            <div className="w-2 h-2 bg-[#e87428] rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                                        </div>
                                        <span className="leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r from-transparent via-[#e87428] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
                        </div>
                    ))}
                </div>

                <div className={`relative bg-linear-to-r from-[#e87428]/10 to-[#ff9a3d]/5 rounded-3xl p-8 md:p-12 border border-gray-700/50 backdrop-blur-sm transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#e87428]/20 rounded-full blur-sm"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#ff9a3d]/10 rounded-full blur-sm"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Paiements 100% adaptés à la{' '}
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                                        Mauritanie
                                    </span>
                                </h3>
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                                    Eventick {"s'intègre"} parfaitement avec les solutions de paiement locales
                                    les plus populaires pour garantir une expérience fluide à tous vos utilisateurs.
                                </p>
                            </div>

                            
                            <div className="flex flex-wrap gap-4">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.name}
                                        className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/10 hover:border-[#e87428]/30 transition-all duration-300 hover:scale-105"
                                    >
                                        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white/20">
                                            <Image
                                                src={method.logo}
                                                alt={method.name}
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="font-semibold text-white">{method.name}</span>
                                    </div>
                                ))}
                            </div>

                    
                        </div>

                        <div className="relative">
                            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="font-bold text-white text-lg">Processus de paiement</h4>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3].map((dot) => (
                                            <div
                                                key={dot}
                                                className="w-2 h-2 bg-gray-600 rounded-full"
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {['Sélection du billet', 'Choix du paiement', 'Confirmation'].map((step, index) => (
                                        <div
                                            key={step}
                                            className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-[#e87428]/30 transition-all duration-300 group"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-linear-to-br from-[#e87428] to-[#ff9a3d] text-white shadow-lg' : 'bg-gray-700 text-gray-400'} font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                                                {index + 1}
                                            </div>
                                            <span className="font-medium text-white flex-1">{step}</span>
                                            {index === 0 && (
                                                <div className="px-3 py-1 bg-[#e87428]/20 text-[#e87428] text-xs font-medium rounded-full border border-[#e87428]/30">
                                                    Rapide
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-linear-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl p-4 text-white text-center shadow-lg">
                                    <p className="font-semibold">Paiement sécurisé en moins de 2 minutes</p>
                                </div>
                            </div>

                            {/* Élément décoratif flottant */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
