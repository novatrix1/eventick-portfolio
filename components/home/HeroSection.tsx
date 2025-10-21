'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroMockup from '@/public/assets/hero-mockup.png';
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Link from 'next/link';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="min-h-screen pt-16  text-(--foreground) relative overflow-hidden">
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#e87428]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#e87428]/15 rounded-full blur-3xl animate-bounce slow"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">

                    <div
                        className={`flex flex-col justify-center space-y-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 w-fit">
                            <span className="w-2 h-2 bg-[#e87428] rounded-full mr-2 animate-ping"></span>
                            <span className="text-sm font-medium text-[#e87428]">
                                Nouveau • Bientot Disponible
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                            Eventick -{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                                Révolution
                            </span>{' '}
                            des événements
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg">
                            La première plateforme de billetterie 100% adaptée au marché mauritanien
                        </p>

                        <div className="space-y-4 pt-4">
                            {[
                                'Paiement sécurisé via Mobile Banking',
                                'QR codes uniques anti-fraude',
                                'Gestion simplifiée pour les organisateurs',
                            ].map((text, index) => (
                                <div key={index} className="flex items-center space-x-4 group">
                                    <div className="w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-200 text-lg font-medium group-hover:text-white transition-colors duration-300">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <button className="group px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <FaApple className="w-6 h-6" />
                                <span>Télécharger sur {"l'A"}pp Store</span>
                            </button>

                            <Link href={"/application"}>
                                <button className="px-8 py-4 text-lg font-semibold text-[#e87428] border-2 border-[#e87428] rounded-2xl hover:bg-[#e87428] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
                                    Voir les fonctionnalités
                                </button>
                            </Link>

                        </div>

                        <div className="flex items-center space-x-6 pt-6">
                            <div className="flex items-center space-x-4 text-gray-400">
                                <span className="text-sm font-medium">Téléchargement gratuit bientot</span>
                                <div className="flex space-x-4">
                                    <div className="w-10 h-10 bg-gray-800/50 hover:bg-[#e87428] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                                        <FaApple className="text-white w-5 h-5" />
                                    </div>
                                    <div className="w-10 h-10 bg-gray-800/50 hover:bg-[#e87428] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                                        <FaGooglePlay className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`relative transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-linear-to-br from-[#e87428]/30 to-[#ff9a3d]/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-linear-to-tr from-[#e87428]/25 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-linear-to-br from-[#e87428]/20 to-transparent rounded-3xl blur-xl"></div>
                                <Image
                                    src={heroMockup}
                                    alt="Eventick - Application mobile de billetterie"
                                    width={600}
                                    height={1200}
                                    className="w-full h-auto drop-shadow-2xl relative z-20"
                                    priority
                                />
                            </div>

                            <div className="absolute top-10 -right-10 w-24 h-24 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-2xl blur-2xl opacity-60 animate-bounce"></div>
                            <div className="absolute bottom-20 -left-10 w-16 h-16 bg-linear-to-br from-[#ff9a3d] to-[#e87428] rounded-full blur-xl opacity-40 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#e87428] to-transparent"></div>
        </section>
    );
};

export default HeroSection;