{/** 
'use client';

import { useState, useEffect } from 'react';

const BusinessPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'utilisateurs' | 'organisateurs'>('utilisateurs');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const revenueModels = [
    {
      icon: '💰',
      title: 'Commissions',
      description: '5-10% sur chaque vente de billet',
      details: [
        'Taux compétitif adapté au marché',
        'Seulement sur les ventes réussies',
        'Pas de frais cachés',
        'Transparence totale sur les commissions'
      ],
      color: 'from-green-500 to-[#1a9a9b]'
    },
    {
      icon: '🎟️',
      title: 'Frais fixes',
      description: '100 MRU par billet vendu',
      details: [
        'Prix fixe et prévisible',
        'Applicable à tous les types de billets',
        'Ideal pour les petits événements',
        'Aucun frais mensuel'
      ],
      color: 'from-blue-500 to-[#1a9a9b]'
    },
    {
      icon: '⭐',
      title: 'Premium',
      description: 'Abonnements organisateurs (analytics avancés)',
      details: [
        'Analytics détaillés et rapports',
        'Support prioritaire',
        'Visibilité accrue sur la plateforme',
        'Fonctionnalités avancées de marketing'
      ],
      color: 'from-[#ff6633] to-purple-500'
    }
  ];

  const competitiveAdvantages = [
    {
      icon: '✅',
      title: 'Adaptation marché',
      description: 'Seule solution avec paiements locaux intégrés',
      details: 'Bankily, Masrvi, Sedad et autres solutions de paiement locales parfaitement intégrées.'
    },
    {
      icon: '✅',
      title: 'Support local',
      description: 'Équipe mauritanienne qui comprend vos besoins',
      details: 'Notre équipe basée à Nouakchott comprend les spécificités du marché mauritanien.'
    },
    {
      icon: '✅',
      title: 'Coûts réduits',
      description: 'Plus besoin d\'impression de billets',
      details: 'Économisez sur l\'impression, la logistique et la gestion des billets physiques.'
    },
    {
      icon: '✅',
      title: 'Croissance',
      description: 'Augmentez votre audience grâce à la plateforme',
      details: 'Bénéficiez de la visibilité sur notre plateforme et touchez de nouveaux publics.'
    }
  ];

  const faqUsers = [
    {
      question: 'Comment créer un compte ?',
      answer: 'Téléchargez l\'application Eventick sur l\'App Store ou Google Play, puis suivez le processus d\'inscription simple avec votre numéro de téléphone ou votre email.'
    },
    {
      question: 'Est-ce que Eventick est gratuit ?',
      answer: 'Oui, l\'application est totalement gratuite pour les participants. Les frais sont supportés par les organisateurs d\'événements.'
    },
    {
      question: 'Comment fonctionne le paiement par Bankily ?',
      answer: 'Sélectionnez Bankily lors du paiement, vous serez redirigé vers l\'application Bankily pour confirmer la transaction. Le paiement est instantané et sécurisé.'
    }
  ];

  const faqOrganizers = [
    {
      question: 'Quels documents pour être vérifié ?',
      answer: 'Nous demandons une pièce d\'identité valide (CNI) et, pour les professionnels, un registre de commerce. La vérification prend 24-48 heures.'
    },
    {
      question: 'Quand sont versés les revenus ?',
      answer: 'Les revenus sont versés sur votre compte bancaire sous 3 à 5 jours ouvrables après la fin de votre événement.'
    },
    {
      question: 'Y a-t-il un nombre minimum d\'événements ?',
      answer: 'Non, vous pouvez créer autant d\'événements que vous le souhaitez, même un seul. Il n\'y a pas d\'engagement minimum.'
    }
  ];

  const testimonials = [
    {
      text: "Avec Eventick, j'ai réservé mes billets pour le concert en 2 minutes ! Le paiement par Bankily est tellement pratique.",
      author: "Aïcha D.",
      role: "Étudiante, Nouakchott",
      avatar: "👩🏾"
    },
    {
      text: "La gestion de mon festival est devenue tellement plus simple ! Les analytics en temps réel m'aident à prendre les bonnes décisions.",
      author: "Mohamed L.",
      role: "Organisateur d'événements",
      avatar: "👨🏾"
    },
    {
      text: "Enfin une solution qui comprend les réalités du marché mauritanien. Le support client est excellent et réactif.",
      author: "Fatou S.",
      role: "Manager de salle de concert",
      avatar: "👩🏾‍💼"
    }
  ];

  return (
    <div className="min-h-screen  pt-16">
      <section className="py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Modèle Business
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Découvrez notre modèle économique gagnant-gagnant et comment Eventick 
              crée de la valeur pour tous les acteurs de l'écosystème événementiel en Mauritanie.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-900 mb-6">
              Un modèle{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6633] to-[#1a9a9b]">
                gagnant-gagnant
              </span>
            </h2>
            <p className="text-xl text-white-600 max-w-3xl mx-auto">
              Notre modèle économique est conçu pour créer de la valeur partagée entre 
              les participants, les organisateurs et Eventick.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {revenueModels.map((model, index) => (
              <div
                key={model.title}
                className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${model.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <span className="text-3xl">{model.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  {model.title}
                </h3>

                <p className="text-lg font-semibold text-[#1a9a9b] text-center mb-6">
                  {model.description}
                </p>

                <ul className="space-y-3">
                  {model.details.map((detail, detailIndex) => (
                    <li 
                      key={detailIndex}
                      className="flex items-start space-x-3 text-gray-600"
                    >
                      <div className="w-5 h-5 bg-[#1a9a9b]/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-[#1a9a9b] rounded-full"></div>
                      </div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Option flexible
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-500 max-w-2xl mx-auto">
              💡 <strong>Flexibilité totale :</strong> Les organisateurs peuvent choisir le modèle qui correspond le mieux 
              à leurs besoins. Combinaison possible des différentes options.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#ff6633]/5 to-[#1a9a9b]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6633] to-[#1a9a9b]">
                Eventick ?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages qui font d'Eventick la solution de billetterie 
              la plus adaptée au marché mauritanien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {competitiveAdvantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-xl">{advantage.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-lg font-semibold text-[#1a9a9b] mb-3">
                      {advantage.description}
                    </p>
                    <p className="text-gray-600">
                      {advantage.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-16 transition-all duration-700 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prêt à rejoindre l'écosystème Eventick ?
              </h3>
              <p className="text-gray-600 mb-6">
                Que vous soyez organisateur ou participant, Eventick a la solution qu'il vous faut.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Devenir organisateur
                </button>
                <button className="px-8 py-3 text-lg font-semibold text-[#1a9a9b] border-2 border-[#1a9a9b] rounded-full hover:bg-[#1a9a9b] hover:text-white transition-all duration-300">
                  Télécharger l'app
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Questions{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6633] to-[#1a9a9b]">
                Fréquentes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur Eventick.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-2xl p-2 flex">
              <button
                onClick={() => setActiveFaqCategory('utilisateurs')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFaqCategory === 'utilisateurs'
                    ? 'bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👥 Pour les Utilisateurs
              </button>
              <button
                onClick={() => setActiveFaqCategory('organisateurs')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFaqCategory === 'organisateurs'
                    ? 'bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎪 Pour les Organisateurs
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {(activeFaqCategory === 'utilisateurs' ? faqUsers : faqOrganizers).map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-500 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start space-x-3">
                    <span className="w-6 h-6 bg-[#1a9a9b] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">
                      ?
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-gray-600 pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="bg-gradient-to-r from-[#ff6633]/5 to-[#1a9a9b]/5 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Vous ne trouvez pas la réponse à votre question ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe de support est là pour vous aider.
                </p>
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span>Contactez-nous</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ils nous font{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6633] to-[#1a9a9b]">
                confiance
              </span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Découvrez ce que disent nos utilisateurs et organisateurs partenaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#1a9a9b]/30 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-lg opacity-90 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-[#1a9a9b] text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-16 transition-all duration-700 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Rejoignez la communauté Eventick
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Des centaines d'organisateurs et des milliers de participants nous font déjà confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#ff6633] to-[#1a9a9b] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Commencer maintenant
              </button>
              <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                Voir les tarifs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
*/}

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page