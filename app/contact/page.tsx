'use client';

import { useState, useEffect } from 'react';
import { FaPaperPlane, FaArrowRight, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import {
    contactInfo,
    socialMedia,
    subjects,
    contactStats,
    heroContent,
    formContent,
    ctaContent,
} from '@/constants/contactData';

const ContactPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                console.error('Erreur API:', result.error);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen pt-16">
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#e87428]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#e87428]/15 rounded-full blur-3xl animate-bounce slow"></div>

            {/* Section Hero */}
            <section className="py-16 text-white relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
                            <span className="text-sm font-medium text-[#e87428]">
                                {heroContent.badge}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {heroContent.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {heroContent.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Contact Principale */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Colonne de gauche - Informations de contact */}
                        <div className={`lg:col-span-1 space-y-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Nos coordonnées
                                </h2>
                                <p className="text-gray-300">
                                    Plusieurs moyens de nous contacter. Choisissez celui qui vous convient le mieux.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={info.title}
                                        href={info.link}
                                        className="group flex items-start space-x-4 p-6 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border border-gray-700/50 hover:border-[#e87428]/30 transition-all duration-300 hover:scale-105"
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="w-14 h-14 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <info.icon className="text-2xl text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white group-hover:text-[#e87428] transition-colors duration-300 text-lg">
                                                {info.title}
                                            </h3>
                                            <p className="text-[#e87428] font-medium text-lg mt-1">{info.value}</p>
                                            <p className="text-gray-400 text-sm mt-1">{info.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Réseaux sociaux */}
                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
                                <h3 className="font-semibold text-white mb-4 text-lg">Suivez-nous</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Restez connecté pour ne rien manquer de nos actualités
                                </p>
                                <div className="flex space-x-3">
                                    {socialMedia.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            className={`w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${social.color} shadow-lg`}
                                            aria-label={social.name}
                                        >
                                            <social.icon className="text-xl" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Statistiques */}
                            <div className="bg-linear-to-r from-[#e87428]/10 to-[#ff9a3d]/5 rounded-3xl p-6 border border-gray-700/50">
                                <h3 className="font-semibold text-white mb-4 text-lg">Nous contacter {"c'est"}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {contactStats.map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-2xl font-bold text-[#e87428]">{stat.value}</div>
                                            <div className="text-xs text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Colonne de droite - Formulaire */}
                        <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                                <div className="absolute top-4 right-4 w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>

                                <div className="mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {formContent.title}
                                    </h2>
                                    <p className="text-gray-300">
                                        {formContent.description}
                                    </p>
                                </div>

                                {/* Messages de statut */}
                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <FaCheck className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-green-400 font-medium">{formContent.successMessage}</p>
                                            <p className="text-green-300 text-sm">{formContent.successDescription}</p>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                            <FaTimes className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-red-400 font-medium">{formContent.errorMessage}</p>
                                            <p className="text-red-300 text-sm">{formContent.errorDescription}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Formulaire */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
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
                                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-3">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
                                                placeholder="+222 XX XX XX XX"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3">
                                                Sujet *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 backdrop-blur-sm appearance-none"
                                            >
                                                <option value="" className="text-gray-400">Choisissez un sujet</option>
                                                {subjects.map((subject) => (
                                                    <option key={subject} value={subject} className="text-gray-800">
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
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
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300 placeholder-gray-400 backdrop-blur-sm resize-none"
                                            placeholder="Décrivez votre projet, posez-nous vos questions ou partagez vos suggestions..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group w-full py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        {isSubmitting ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Envoi en cours...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                                                <span>Envoyer mon message</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-gray-400 text-sm">
                                        {formContent.securityNote}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="py-16 bg-linear-to-r from-[#e87428]/10 to-[#ff9a3d]/5 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {ctaContent.title}
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {ctaContent.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="group px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-[#e87428] to-[#ff9a3d] rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <FaDownload className="w-5 h-5" />
                                <span>{ctaContent.buttonText}</span>
                                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section FAQ */}
            {/**
             * 
             *  <section className="py-16 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className={`text-center mb-12 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {faqSection.title}
                            </h2>
                            <p className="text-gray-300">
                                {faqSection.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-[#e87428]/30 transition-all duration-300 hover:scale-105"
                                >
                                    <h3 className="font-semibold text-white mb-3 group-hover:text-[#e87428] transition-colors duration-300">{faq.question}</h3>
                                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
             */}

        </div>
    );
};

export default ContactPage;