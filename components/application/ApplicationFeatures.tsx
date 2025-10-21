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

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const currentFeatures = activeTab === 'participants' ? participantFeatures : organizerFeatures;

    return (
        <div className="min-h-screen pt-16 ">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#e87428]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e87428]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <section className="py-16 text-white relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
                            <span className="text-sm font-medium text-[#e87428]">
                                Application Mobile
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {"L'Application"}{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                                Eventick
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Découvrez comment Eventick révolutionne {"l'expérience"} des participants
                            et simplifie la gestion pour les organisateurs {"d'événements "}en Mauritanie.
                        </p>
                    </div>
                </div>
            </section>

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

            <section className="py-16 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {activeTab === 'participants'
                                ? 'Réservez vos billets en quelques minutes'
                                : 'Gérez vos événements comme un pro'
                            }
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {activeTab === 'participants'
                                ? 'Une expérience fluide et sécurisée de la découverte à la participation'
                                : 'Tous les outils dont vous avez besoin pour réussir vos événements'
                            }
                        </p>
                    </div>

                    <div className="space-y-20">
                        {currentFeatures.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 200}ms`
                                }}
                            >
                                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="flex items-start space-x-6">
                                        <div className="w-20 h-20 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                            <IconRenderer iconName={feature.icon} className="text-3xl text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-lg text-[#e87428] font-semibold">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        {feature.details.map((detail, detailIndex) => (
                                            <li
                                                key={detailIndex}
                                                className="flex items-start space-x-4 text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                                            >
                                                <div className="w-6 h-6 bg-[#e87428]/20 rounded-full flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-[#e87428]/30 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-[#e87428] rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                                                </div>
                                                <span className="text-lg leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <button className="group inline-flex items-center space-x-3 px-6 py-4 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                                            <span>En savoir plus</span>
                                            <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>

                                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="mx-auto w-full max-w-sm">
                                        <div className="absolute -inset-4 bg-linear-to-br from-[#e87428]/20 to-[#ff9a3d]/10 rounded-3xl blur-xl"></div>

                                        <div className="relative w-full aspect-9/19 rounded-3xl overflow-hidden">
                                            <Image
                                                src={feature.image}
                                                alt={`${feature.title} - Eventick`}
                                                fill
                                                className="object-contain rounded-3xl shadow-2xl"
                                                priority={index === 0}
                                            />
                                        </div>

                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-linear-to-br from-[#ff9a3d] to-[#e87428] rounded-full blur-sm"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`text-center mt-20 transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="relative bg-linear-to-r from-[#e87428]/10 to-[#ff9a3d]/5 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-sm max-w-4xl mx-auto">
                            <div className="absolute top-6 left-6 w-12 h-12 bg-[#e87428]/10 rounded-full blur-lg"></div>
                            <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#ff9a3d]/5 rounded-full blur-lg"></div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Prêt à {activeTab === 'participants' ? 'réserver votre premier billet' : 'créer votre premier événement'} ?
                            </h3>
                            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                                {activeTab === 'participants'
                                    ? 'Rejoignez des milliers de Mauritaniens qui utilisent déjà Eventick pour leurs sorties et événements.'
                                    : 'Rejoignez les organisateurs qui font confiance à Eventick pour simplifier la gestion de leurs événements.'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="group relative px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <span>
                                        {activeTab === 'participants' ? "Télécharger l'app" : 'Devenir organisateur'}
                                    </span>
                                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <Link
                                    href={activeTab === 'participants' ? '/contact' : '/contact'}
                                    className="px-8 py-4 text-lg font-semibold text-[#e87428] border-2 border-[#e87428] rounded-2xl hover:bg-[#e87428] hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                                >
                                    Contactez-nous
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                Téléchargement bientot disponible
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Disponible sur iOS et Android - {"C'est"} gratuit !
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-8 py-4 bg-black text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105"
                            >
                                <FaApple className="w-6 h-6" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-400">Télécharger sur</div>
                                    <div className="font-semibold">App Store</div>
                                </div>
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-8 py-4 bg-linear-to-br from-[#e87428] to-[#ff9a3d] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105"
                            >
                                <FaGooglePlay className="w-6 h-6" />
                                <div className="text-left">
                                    <div className="text-xs text-white/90">Disponible sur</div>
                                    <div className="font-semibold">Google Play</div>
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