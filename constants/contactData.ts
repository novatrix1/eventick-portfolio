import { IconType } from 'react-icons';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa';

export interface ContactInfo {
    icon: IconType;
    title: string;
    value: string;
    description: string;
    link: string;
}

export interface SocialMedia {
    name: string;
    icon: IconType;
    url: string;
    color: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export const contactInfo: ContactInfo[] = [
    {
        icon: FaEnvelope,
        title: 'Email',
        value: 'contact@novatrix.dev',
        description: 'Nous répondons sous 24h',
        link: 'mailto:contact@eventick.mr'
    },
    {
        icon: FaPhone,
        title: 'Téléphone',
        value: '+222 47 35 02 65',
        description: 'Lun - Ven : 9h - 18h',
        link: 'tel:+22247350265'
    },
    {
        icon: FaMapMarkerAlt,
        title: 'Adresse',
        value: 'Nouakchott, Mauritanie',
        description: 'Service disponible partout',
        link: '#'
    },
    {
        icon: FaClock,
        title: 'Horaires',
        value: 'Lun - Ven : 9h - 18h',
        description: 'Support en continu',
        link: '#'
    }
];

export const socialMedia: SocialMedia[] = [
    {
        name: 'Facebook',
        icon: FaFacebook,
        url: 'https://www.facebook.com/novatrix01',
        color: 'hover:bg-[#1877F2]'
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://www.instagram.com/novat_rix/',
        color: 'hover:bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]'
    },
    {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://www.linkedin.com/company/novatrix01/',
        color: 'hover:bg-[#0A66C2]'
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        url: 'https://x.com/Novatrix01',
        color: 'hover:bg-[#1DA1F2]'
    }
];

export const subjects: string[] = [
    'Partenariat',
    'Support',
    'Devenir organisateur',
    'Problème technique',
    'Suggestion',
    'Autre'
];

export const faqs: FAQ[] = [
    {
        question: "Quel est le délai de réponse ?",
        answer: "Nous répondons à tous les messages dans un délai de 24 heures maximum."
    },
    {
        question: "Eventick est-il disponible dans toute la Mauritanie ?",
        answer: "Oui, notre service est disponible dans toutes les régions de la Mauritanie."
    },
    {
        question: "Comment devenir organisateur partenaire ?",
        answer: "Remplissez le formulaire de contact en sélectionnant 'Devenir organisateur' ou contactez-nous directement."
    },
    {
        question: "Quels modes de paiement acceptez-vous ?",
        answer: "Nous intégrons Bankily, Masrvi, Sedad et autres solutions de paiement locales."
    }
];

export const contactStats = [
    { value: '24h', label: 'Délai de réponse' },
    { value: '7j/7', label: 'Support' },
    { value: '100%', label: 'Gratuit' }
];

export const heroContent = {
    badge: "Contact & Support",
    title: "Contactez-nous",
    description: "Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner dans la digitalisation de vos événements en Mauritanie."
};

export const formContent = {
    title: "Envoyez-nous un message",
    description: "Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.",
    successMessage: "Message envoyé avec succès !",
    successDescription: "Nous vous recontacterons rapidement.",
    errorMessage: "Erreur lors de l'envoi",
    errorDescription: "Veuillez réessayer dans quelques instants.",
    securityNote: "Vos informations sont sécurisées et ne seront jamais partagées avec des tiers."
};

export const ctaContent = {
    title: "Prêt à révolutionner vos événements ?",
    description: "Rejoignez la communauté Eventick et découvrez comment digitaliser vos événements en Mauritanie simplement et efficacement.",
    buttonText: "Téléchargement bientot disponible"
};

export const faqSection = {
    title: "Questions fréquentes",
    description: "Quelques réponses aux questions que vous pourriez vous poser."
};