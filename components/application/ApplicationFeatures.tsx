'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaApple,
    FaGooglePlay,
    FaArrowRight,
    FaSearch,
    FaCreditCard,
    FaTicketAlt,
    FaBell,
    FaChartLine,
    FaChartBar,
    FaMobileAlt,
    FaUserFriends,
    FaUserTie
} from 'react-icons/fa';

interface Feature {
    icon: string;
    title: string;
    description: string;
    details: string[];
    image: string;
}

interface ApplicationFeaturesProps {
    participantFeatures: Feature[];
    organizerFeatures: Feature[];
}

const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
        FaSearch: <FaSearch className={className} />,
        FaCreditCard: <FaCreditCard className={className} />,
        FaTicketAlt: <FaTicketAlt className={className} />,
        FaBell: <FaBell className={className} />,
        FaChartLine: <FaChartLine className={className} />,
        FaChartBar: <FaChartBar className={className} />,
        FaMobileAlt: <FaMobileAlt className={className} />,
        FaUserFriends: <FaUserFriends className={className} />
    };

    return icons[iconName] || <FaSearch className={className} />;
};

const ApplicationFeatures = ({ participantFeatures, organizerFeatures }: ApplicationFeaturesProps) => {
    const [activeTab, setActiveTab] = useState<'participants' | 'organisateurs'>('participants');
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const currentFeatures = activeTab === 'participants' ? participantFeatures : organizerFeatures;

    return (
        <div className="min-h-screen pt-16 overflow-x-hidden">
            {/* Arrière-plan décoratif */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#e87428]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e87428]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            {/* Section Hero */}
            <section className="py-12 md:py-16 text-white relative">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-4 md:mb-6">
                            <span className="text-sm font-medium text-[#e87428]">
                                Application Mobile
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
                            {"L'Application"}{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                                Eventick
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                            Découvrez comment Eventick révolutionne {"l'expérience"} des participants
                            et simplifie la gestion pour les organisateurs {"d'événements "}en Mauritanie.
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigation par onglets - Améliorée pour mobile */}
            <section className="py-6 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-16 z-40 shadow-2xl">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-center">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 flex border border-gray-700/50 w-full max-w-md">
                            <button
                                onClick={() => setActiveTab('participants')}
                                className={`group flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${activeTab === 'participants'
                                        ? 'bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                            >
                                <FaUserFriends className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="whitespace-nowrap">Participants</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('organisateurs')}
                                className={`group flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${activeTab === 'organisateurs'
                                        ? 'bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                            >
                                <FaUserTie className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="whitespace-nowrap">Organisateurs</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des fonctionnalités */}
            <section className="py-12 md:py-16 relative">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* En-tête de section */}
                    <div className={`text-center mb-12 md:mb-16 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 px-4">
                            {activeTab === 'participants'
                                ? 'Réservez vos billets en quelques minutes'
                                : 'Gérez vos événements comme un pro'
                            }
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                            {activeTab === 'participants'
                                ? 'Une expérience fluide et sécurisée de la découverte à la participation'
                                : 'Tous les outils dont vous avez besoin pour réussir vos événements'
                            }
                        </p>
                    </div>

                    {/* Grille des fonctionnalités - Responsive */}
                    <div className="space-y-16 md:space-y-20">
                        {currentFeatures.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center transition-all duration-700 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                                style={{
                                    transitionDelay: `${index * 200}ms`
                                }}
                            >
                                {/* Contenu texte - Toujours en premier sur mobile */}
                                <div className={`space-y-6 md:space-y-8 order-2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 mx-auto sm:mx-0">
                                            <IconRenderer iconName={feature.icon} className="text-2xl md:text-3xl text-white" />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-base md:text-lg text-[#e87428] font-semibold">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Liste des détails */}
                                    <ul className="space-y-3 md:space-y-4">
                                        {feature.details.map((detail, detailIndex) => (
                                            <li
                                                key={detailIndex}
                                                className="flex items-start space-x-3 md:space-x-4 text-gray-300 transition-colors duration-300"
                                            >
                                                <div className="w-5 h-5 md:w-6 md:h-6 bg-[#e87428]/20 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-colors duration-300">
                                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#e87428] rounded-full transition-transform duration-300"></div>
                                                </div>
                                                <span className="text-base md:text-lg leading-relaxed flex-1">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Bouton d'action */}
                                    <div className="pt-2 md:pt-4 text-center sm:text-left">
                                        <button className="group inline-flex items-center space-x-2 md:space-x-3 px-5 py-3 md:px-6 md:py-4 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                                            <span className="text-sm md:text-base">En savoir plus</span>
                                            <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>

                                {/* Image - Toujours en second sur mobile */}
                                <div className={`relative order-1 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
                                    <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
                                        <div className="absolute -inset-3 md:-inset-4 bg-linear-to-br from-[#e87428]/20 to-[#ff9a3d]/10 rounded-3xl blur-xl"></div>

                                        <div className="relative w-full aspect-9/19 rounded-3xl overflow-hidden">
                                            <Image
                                                src={feature.image}
                                                alt={`${feature.title} - Eventick`}
                                                fill
                                                className="object-contain rounded-3xl shadow-2xl"
                                                sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, 400px"
                                                priority={index === 0}
                                            />
                                        </div>

                                        {/* Éléments décoratifs */}
                                        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>
                                        <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 bg-linear-to-br from-[#ff9a3d] to-[#e87428] rounded-full blur-sm"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section CTA */}
                    <div className={`text-center mt-16 md:mt-20 transition-all duration-700 delay-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        <div className="relative bg-linear-to-r from-[#e87428]/10 to-[#ff9a3d]/5 rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-700/50 backdrop-blur-sm max-w-4xl mx-auto">
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 bg-[#e87428]/10 rounded-full blur-lg"></div>
                            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-16 md:h-16 bg-[#ff9a3d]/5 rounded-full blur-lg"></div>

                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                                Prêt à {activeTab === 'participants' ? 'réserver votre premier billet' : 'créer votre premier événement'} ?
                            </h3>
                            <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                                {activeTab === 'participants'
                                    ? 'Rejoignez des milliers de Mauritaniens qui utilisent déjà Eventick pour leurs sorties et événements.'
                                    : 'Rejoignez les organisateurs qui font confiance à Eventick pour simplifier la gestion de leurs événements.'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                                <button className="group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white bg-linear-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <span>
                                        {activeTab === 'participants' ? "Télécharger l'app" : 'Devenir organisateur'}
                                    </span>
                                    <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-[#e87428] border-2 border-[#e87428] rounded-2xl hover:bg-[#e87428] hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-center"
                                >
                                    Contactez-nous
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section de téléchargement */}
            <section className="py-12 md:py-16 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                                Téléchargement bientôt disponible
                            </h3>
                            <p className="text-gray-300 text-base md:text-lg">
                                Disponible sur iOS et Android - {"C'est"} gratuit !
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                            <a
                                href="#"
                                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-black text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 hover:scale-105"
                            >
                                <FaApple className="w-5 h-5 md:w-6 md:h-6" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-400">Télécharger sur</div>
                                    <div className="font-semibold text-sm md:text-base">App Store</div>
                                </div>
                            </a>

                            <a
                                href="#"
                                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-linear-to-br from-[#e87428] to-[#ff9a3d] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 hover:scale-105"
                            >
                                <FaGooglePlay className="w-5 h-5 md:w-6 md:h-6" />
                                <div className="text-left">
                                    <div className="text-xs text-white/90">Disponible sur</div>
                                    <div className="font-semibold text-sm md:text-base">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ApplicationFeatures;