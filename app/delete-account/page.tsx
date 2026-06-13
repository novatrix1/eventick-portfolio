'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DeleteAccount() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-gray-900 text-gray-200 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
            {/* Background Blobs */}
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#e87428]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#e87428]/15 rounded-full blur-3xl animate-bounce slow"></div>

            <div className="container mx-auto relative z-10">
                <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-[#e87428] to-[#ff9a3d]">
                        Suppression de compte - Eventick
                    </h1>

                    <p className="mb-6 text-gray-300">
                        Développeur : <strong>Novatrix</strong>
                    </p>

                    {/* Sections */}
                    {[
                        {
                            title: "1. Demande de suppression de compte",
                            content: "Si vous souhaitez supprimer votre compte Eventick et toutes les données associées (photos, vidéos, enregistrements audio, informations de profil), veuillez suivre la procédure ci-dessous :"
                        },
                        {
                            title: "2. Étapes pour supprimer votre compte",
                            content: "1. Envoyez un email à ",
                            link: { text: "contact@novatrix.dev", href: "mailto:contact@novatrix.dev" },
                            extra: " avec l’objet 'Suppression de compte Eventick'.\n2. Indiquez l’adresse email ou l’identifiant utilisé pour votre compte Eventick.\n3. Nous traiterons votre demande et supprimerons toutes vos données personnelles dans un délai maximum de 30 jours."
                        },
                        {
                            title: "3. Remarques importantes",
                            content: "Certaines informations techniques peuvent être conservées anonymement pour des raisons légales ou de sécurité."
                        }
                    ].map((section, idx) => (
                        <section key={idx} className="mb-6 p-6 bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                            <h2 className="text-2xl font-semibold mb-2 text-[#e87428]">{section.title}</h2>
                            <p className="whitespace-pre-line text-gray-300">
                                {section.content}
                                {section.link && (
                                    <Link href={section.link.href} className="text-[#ff9a3d] underline ml-1">
                                        {section.link.text}
                                    </Link>
                                )}
                                {section.extra && <span className="block mt-2">{section.extra}</span>}
                            </p>
                        </section>
                    ))}

                    {/* Footer / Back */}
                    <div className="text-center pt-8">
                        <Link href="/" className="inline-block px-6 py-3 rounded-2xl bg-linear-to-r from-[#e87428] to-[#ff9a3d] font-semibold shadow-xl hover:scale-105 transform transition-all duration-300">
                            {"Retour à l'accueil"}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
