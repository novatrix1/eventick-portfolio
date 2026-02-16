'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
                        Privacy Policy - Eventick
                    </h1>

                    <p className="mb-6 text-gray-300">
                        Effective date: <strong>16 February 2026</strong>
                    </p>

                    {/* Sections */}
                    {[
                        {
                            title: "1. Information We Collect",
                            content: "Eventick ('we', 'our', or 'us') requires access to your device’s Camera to enable core app functionality, such as capturing photos and videos for events."
                        },
                        {
                            title: "2. How We Use Your Information",
                            content: "The information captured via Camera is used solely to provide the app's features. We do not share, sell, or distribute this data to any third parties."
                        },
                        {
                            title: "3. Data Storage and Security",
                            content: "All data captured via the app is stored securely and is only accessible by the user on their device unless explicitly uploaded to the Eventick service with the user's consent."
                        },
                        {
                            title: "4. Your Rights",
                            content: "You can revoke Camera permissions at any time via your device settings. You may contact us at ",
                            link: { text: "contact@novatrix.com", href: "mailto:contact@novatrix.dev" }
                        },
                        {
                            title: "5. Updates to This Privacy Policy",
                            content: "We may update this policy from time to time. Changes will be posted on this page with the updated effective date."
                        }
                    ].map((section, idx) => (
                        <section key={idx} className="mb-6 p-6 bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                            <h2 className="text-2xl font-semibold mb-2 text-[#e87428]">{section.title}</h2>
                            <p className="text-gray-300">
                                {section.content}
                                {section.link && (
                                    <Link href={section.link.href} className="text-[#ff9a3d] underline ml-1">
                                        {section.link.text}
                                    </Link>
                                )}
                            </p>
                        </section>
                    ))}

                    {/* Footer / Back */}
                    <div className="text-center pt-8">
                        <Link href="/" className="inline-block px-6 py-3 rounded-2xl bg-linear-to-r from-[#e87428] to-[#ff9a3d] font-semibold shadow-xl hover:scale-105 transform transition-all duration-300">
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
