'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Effet pour détecter le scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Accueil', href: '/' },
        { name: 'L\'Application', href: '/application' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-700/50' 
                : 'bg-transparent'
        }`}>
            {/* Barre de navigation principale */}
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center space-x-3 group"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="relative">
                            <Image
                                src="/images/eventick.png"
                                alt="Eventick Logo"
                                width={130}
                                height={130}
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                                priority
                            />
                            {/* Effet de lueur sur le logo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#e87428] to-[#ff9a3d] rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
                        </div>
                    </Link>

                    {/* Navigation Desktop */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group ${
                                    isActive(item.href)
                                        ? 'text-white bg-gradient-to-r from-[#e87428] to-[#ff9a3d] shadow-lg shadow-[#e87428]/25'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                
                                {/* Effet de bordure animée pour les liens actifs */}
                                {isActive(item.href) && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e87428] to-[#ff9a3d] opacity-75 blur-sm -z-10"></div>
                                )}
                                
                                {/* Effet de hover pour les liens inactifs */}
                                {!isActive(item.href) && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e87428] to-[#ff9a3d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Boutons CTA Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <button className="group relative px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <span className="relative z-10">Télécharger</span>
                        </button>
                    </div>

                    {/* Menu Mobile Button */}
                    <button
                        className="lg:hidden p-3 rounded-2xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <div className="relative w-6 h-6">
                            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                isMenuOpen ? 'rotate-45' : '-translate-y-2'
                            }`}></span>
                            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                isMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}></span>
                            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                isMenuOpen ? '-rotate-45' : 'translate-y-2'
                            }`}></span>
                        </div>
                    </button>
                </div>

                {/* Menu Mobile */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
                    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="bg-gray-900/95 backdrop-blur-md rounded-3xl border border-gray-700/50 shadow-2xl mt-2 mb-4">
                        <div className="px-4 py-6 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                                        isActive(item.href)
                                            ? 'text-white bg-gradient-to-r from-[#e87428] to-[#ff9a3d] shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Boutons CTA Mobile */}
                            <div className="pt-4 mt-4 border-t border-gray-700/50 space-y-3">
                                <button 
                                    className="w-full px-4 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Télécharger l'application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Élément décoratif en bas du header */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87428] to-transparent opacity-50"></div>
        </header>
    );
};

export default Header;