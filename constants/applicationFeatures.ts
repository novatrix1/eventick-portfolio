import { IconType } from 'react-icons';
import { 
  FaSearch, 
  FaCreditCard, 
  FaTicketAlt, 
  FaBell, 
  FaChartLine, 
  FaChartBar, 
  FaMobileAlt, 
  FaUserFriends 
} from 'react-icons/fa';

export interface Feature {
  icon: IconType; 
  title: string;
  description: string;
  details: string[];
  image: string;
}

export const participantFeatures: Feature[] = [
  {
    icon: FaSearch,
    title: 'Découverte',
    description: 'Parcourez tous les événements près de chez vous avec filtres intelligents',
    details: [
      'Recherche géolocalisée',
      'Filtres par catégorie, date et prix',
      'Événements tendances mis en avant',
      'Recommandations personnalisées'
    ],
    image: '/images/Decouverte.png' 
  },
  {
    icon: FaCreditCard,
    title: 'Paiement',
    description: 'Payez facilement avec les Mobile Banking',
    details: [
      'Intégration Mobile Banking Local',
      'Paiements sécurisés',
      'Processus en 3 étapes simples',
    ],
    image: '/images/Paiement.png' 
  },
  {
    icon: FaTicketAlt,
    title: 'Billets digitaux',
    description: 'Recevez votre QR code unique directement dans l\'app',
    details: [
      'QR codes uniques',
      'Accès hors ligne aux billets',
      'Partage facile avec les amis',
      'Historique de tous vos billets'
    ],
    image: '/images/Billets.png' 
  },
  {
    icon: FaBell,
    title: 'Rappels',
    description: 'Notifications push pour ne rien manquer',
    details: [
      'Rappels 24h avant l\'événement',
      'Alertes changements de programme',
      'Notifications exclusives',
    ],
    image: '/images/Rappels.png' 
  }
];

export const organizerFeatures: Feature[] = [
  {
    icon: FaChartLine,
    title: 'Dashboard',
    description: 'Créez et suivez vos événements en temps réel',
    details: [
      'Interface de création intuitive',
      'Gestion multi-événements',
      'Statuts de vente en direct',
      'Modification en temps réel'
    ],
    image: '/images/Dashboard.png'
  },
  {
    icon: FaChartBar,
    title: 'Analytics',
    description: 'Ventes, revenus, taux de conversion en direct',
    details: [
      'Tableaux de bord détaillés',
      'Analyses de performance',
      'Indicateurs clés de succès'
    ],
    image: '/images/Analytics.png' 
  },
  {
    icon: FaMobileAlt,
    title: 'Scanner',
    description: 'Validez les entrées avec le scan QR code',
    details: [
      'Scanner haute vitesse',
      'Fonctionnement hors ligne',
      'Historique des validations',
    ],
    image: '/images/Scanner.png' 
  },
  {
    icon: FaUserFriends,
    title: 'Validation',
    description: 'Devenez organisateur certifié',
    details: [
      'Processus de vérification simple',
      'Badge de confiance visible',
      'Support dédié organisateurs',
    ],
    image: '/images/Validation.png' 
  }
];