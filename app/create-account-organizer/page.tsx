'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaClock,
  FaBuilding,
  FaIdCard,
  FaImage,
  FaTrash,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUser,
  FaKey,
} from 'react-icons/fa';

// Constantes pour les catégories et types d'organisateur
const CATEGORIES = [
  'Concerts',
  'Festivals',
  'Conférences',
  'Ateliers',
  'Sports',
  'Arts',
  'Théâtre',
  'Expositions',
  'Formations',
  'Autre',
];

const ORGANIZER_TYPES = [
  { value: 'company', label: 'Entreprise' },
  { value: 'association', label: 'Association' },
  { value: 'individual', label: 'Individuel' },
];

const ANDROID_STORE =
  'https://play.google.com/store/apps/details?id=com.arsprod01.eventick';
const IOS_STORE = 'https://apps.apple.com/app/id6758682794';

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
function isAndroid() {
  if (typeof navigator === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
}
function isMobile() {
  return isIOS() || isAndroid();
}

// Composant de redirection vers l'application
const AppRedirectButtons = () => {
  const [appOpened, setAppOpened] = useState(false);

  const handleOpenApp = () => {
    if (isMobile()) {
      window.location.href = 'eventick://organizer/verify';
      setTimeout(() => {
        if (!appOpened) {
          if (isIOS()) window.open(IOS_STORE, '_blank');
          else window.open(ANDROID_STORE, '_blank');
        }
      }, 2500);
    } else {
      window.open(IOS_STORE, '_blank');
    }
  };

  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleOpenApp}
        className="group w-full max-w-md mx-auto py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <Image
          src="/eventick-icon.svg"
          alt="Eventick"
          width={24}
          height={24}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <span>{isMobile() ? 'Ouvrir dans Eventick' : 'Télécharger Eventick'}</span>
        <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </button>
      <div className="flex gap-4 justify-center mt-4">
        <a
          href={IOS_STORE}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-white hover:border-[#e87428]/30 transition-all duration-300"
        >
          <Image src="/Apple.svg" alt="App Store" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
          App Store
        </a>
        <a
          href={ANDROID_STORE}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-white hover:border-[#e87428]/30 transition-all duration-300"
        >
          <Image src="/google-play-icon.svg" alt="Google Play" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
          Google Play
        </a>
      </div>
    </div>
  );
};

export default function BecomeOrganizerPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<'register' | 'verify' | 'organizer' | 'success'>('register');

  // Données d'inscription utilisateur
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // États de chargement et erreurs
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Données du formulaire organisateur
  const [organizerData, setOrganizerData] = useState({
    companyName: '',
    address: '',
    phone: '',
    type: '',
    website: '',
    description: '',
    contactEmail: '',
    businessHours: '',
    categories: [] as string[],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });

  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);

  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Gestion des champs d'inscription
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Inscription (étape 1)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Validation
    if (!userData.name || !userData.email || !userData.phone || !userData.password) {
      setErrorMessage('Tous les champs sont requis');
      setIsLoading(false);
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://eventick.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        setSuccessMessage('Un code de vérification a été envoyé à votre email.');
        setStep('verify');
      } else {
        setErrorMessage(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setErrorMessage('Erreur réseau. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Vérification OTP (étape 2)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrorMessage('Veuillez saisir le code OTP');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://eventick.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        // Vérification réussie : maintenant on se connecte pour obtenir le token
        const loginRes = await fetch('https://eventick.onrender.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        });
        const loginData = await loginRes.json();

        if (loginRes.ok) {
          setToken(loginData.token);
          localStorage.setItem('token', loginData.token);
          // Pré-remplir le formulaire organisateur avec les données de l'utilisateur
          setOrganizerData((prev) => ({
            ...prev,
            companyName: userData.name,
            phone: userData.phone,
            contactEmail: userData.email,
          }));
          setStep('organizer');
        } else {
          setErrorMessage(loginData.message || 'Erreur de connexion après vérification');
        }
      } else {
        setErrorMessage(data.message || 'Code OTP invalide ou expiré');
      }
    } catch (error) {
      setErrorMessage('Erreur réseau. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Renvoyer OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('https://eventick.onrender.com/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Un nouveau code OTP a été envoyé à votre email.');
        setUserId(data.userId);
      } else {
        setErrorMessage(data.message || 'Erreur lors du renvoi du code');
      }
    } catch (error) {
      setErrorMessage('Erreur réseau.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion du formulaire organisateur
  const handleOrganizerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrganizerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setOrganizerData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }));
  };

  const handleCategoryChange = (category: string) => {
    setOrganizerData((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'front' | 'back'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'front') {
      setIdFrontFile(file);
      const preview = URL.createObjectURL(file);
      setIdFrontPreview(preview);
    } else {
      setIdBackFile(file);
      const preview = URL.createObjectURL(file);
      setIdBackPreview(preview);
    }
  };

  const removeFile = (type: 'front' | 'back') => {
    if (type === 'front') {
      setIdFrontFile(null);
      if (idFrontPreview) URL.revokeObjectURL(idFrontPreview);
      setIdFrontPreview(null);
      if (idFrontRef.current) idFrontRef.current.value = '';
    } else {
      setIdBackFile(null);
      if (idBackPreview) URL.revokeObjectURL(idBackPreview);
      setIdBackPreview(null);
      if (idBackRef.current) idBackRef.current.value = '';
    }
  };

  const handleSubmitOrganizer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!organizerData.companyName || !organizerData.phone || !organizerData.contactEmail || !idFrontFile || !idBackFile) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires et ajouter les deux faces de votre pièce d’identité.');
      setIsLoading(false);
      return;
    }

    const submitData = new FormData();
    submitData.append('companyName', organizerData.companyName);
    submitData.append('address', organizerData.address);
    submitData.append('phone', organizerData.phone);
    submitData.append('type', organizerData.type);
    submitData.append('website', organizerData.website);
    submitData.append('description', organizerData.description);
    submitData.append('contactEmail', organizerData.contactEmail);
    submitData.append('businessHours', organizerData.businessHours);
    submitData.append('categories', JSON.stringify(organizerData.categories));
    submitData.append('socialMedia', JSON.stringify(organizerData.socialMedia));
    submitData.append('idFront', idFrontFile);
    submitData.append('idBack', idBackFile);

    try {
      const response = await fetch('https://eventick.onrender.com/api/organizers/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });
      const result = await response.json();

      if (response.ok) {
        setStep('success');
      } else {
        setErrorMessage(result.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rendu conditionnel des étapes
  return (
    <div className="min-h-screen pt-16">
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#e87428]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#e87428]/15 rounded-full blur-3xl animate-bounce slow"></div>

      {/* Section Hero */}
      <section className="py-16 text-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
              <span className="text-sm font-medium text-[#e87428]">Devenir organisateur</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Organisez des événements <span className="text-[#e87428]">inoubliables</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rejoignez notre plateforme et créez, gérez et promouvez vos événements auprès de milliers de participants.
            </p>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
              <div className="absolute top-4 right-4 w-8 h-8 bg-linear-to-br from-[#e87428] to-[#ff9a3d] rounded-full blur-sm animate-pulse"></div>

              {/* Étape 1 : Inscription */}
              {step === 'register' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Créez votre compte
                    </h2>
                    <p className="text-gray-300">
                      Commencez par créer un compte. Un code de vérification vous sera envoyé par email.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <FaTimes className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-green-400 text-sm">{successMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Nom complet *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleUserChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleUserChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Téléphone *
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleUserChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                            placeholder="+222 XX XX XX XX"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                          Mot de passe *
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleUserChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={userData.confirmPassword}
                          onChange={handleUserChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group w-full py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      {isLoading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Création du compte...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-5 h-5" />
                          <span>Créer mon compte</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Étape 2 : Vérification OTP */}
              {step === 'verify' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Vérification
                    </h2>
                    <p className="text-gray-300">
                      Un code à 6 chiffres a été envoyé à <strong>{userData.email}</strong>. Saisissez-le ci-dessous.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <FaTimes className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheck className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-green-400 text-sm">{successMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                        Code OTP
                      </label>
                      <div className="relative">
                        <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent transition-all duration-300"
                          placeholder="123456"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group w-full py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      {isLoading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Vérification...</span>
                        </>
                      ) : (
                        <>
                          <FaCheck className="w-5 h-5" />
                          <span>Vérifier mon compte</span>
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-[#e87428] hover:text-[#ff9a3d] text-sm font-medium transition-colors"
                      >
                        Renvoyer le code
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Étape 3 : Formulaire organisateur */}
              {step === 'organizer' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Devenir organisateur
                    </h2>
                    <p className="text-gray-300">
                      {"Complétez ces informations pour finaliser votre inscription en tant qu'organisateur."}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <FaTimes className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmitOrganizer} className="space-y-8">
                    {/* Informations générales */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FaBuilding className="text-[#e87428]" />
                        Informations générales
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                            {"Nom de l'organisation *"}
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={organizerData.companyName}
                            onChange={handleOrganizerChange}
                            required
                            className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                            placeholder="Ex: Eventick Production"
                          />
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                           {" Type d'organisation *"}
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={organizerData.type}
                            onChange={handleOrganizerChange}
                            required
                            className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent appearance-none"
                          >
                            <option value="" disabled>Sélectionnez</option>
                            {ORGANIZER_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                          Adresse complète
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          value={organizerData.address}
                          onChange={handleOrganizerChange}
                          className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                          placeholder="Rue, code postal, ville, pays"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                            Téléphone *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={organizerData.phone}
                            onChange={handleOrganizerChange}
                            required
                            className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                            placeholder="+222 XX XX XX XX"
                          />
                        </div>
                        <div>
                          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-2">
                            Email de contact *
                          </label>
                          <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={organizerData.contactEmail}
                            onChange={handleOrganizerChange}
                            required
                            className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                            placeholder="contact@votreorganisation.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                          Site web
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={organizerData.website}
                          onChange={handleOrganizerChange}
                          className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                          placeholder="https://www.votre-site.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                          Description de votre activité
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={organizerData.description}
                          onChange={handleOrganizerChange}
                          className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent"
                          placeholder="Présentez votre organisation, votre expérience dans l'événementiel, etc."
                        />
                      </div>

                      
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FaGlobe className="text-[#e87428]" />
                        Réseaux sociaux
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                          <FaFacebook className="text-blue-500 text-2xl" />
                          <input
                            type="url"
                            placeholder="Facebook"
                            value={organizerData.socialMedia.facebook}
                            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428]"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <FaTwitter className="text-blue-400 text-2xl" />
                          <input
                            type="url"
                            placeholder="Twitter"
                            value={organizerData.socialMedia.twitter}
                            onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428]"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <FaInstagram className="text-pink-500 text-2xl" />
                          <input
                            type="url"
                            placeholder="Instagram"
                            value={organizerData.socialMedia.instagram}
                            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428]"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <FaLinkedin className="text-blue-700 text-2xl" />
                          <input
                            type="url"
                            placeholder="LinkedIn"
                            value={organizerData.socialMedia.linkedin}
                            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-2xl focus:ring-2 focus:ring-[#e87428]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Catégories */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FaClock className="text-[#e87428]" />
                       {" Catégories d'événements"}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((cat) => (
                          <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={organizerData.categories.includes(cat)}
                              onChange={() => handleCategoryChange(cat)}
                              className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[#e87428] focus:ring-[#e87428] focus:ring-offset-0"
                            />
                            <span className="text-gray-300">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Pièce d'identité */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FaIdCard className="text-[#e87428]" />
                        {"Pièce d'identité *"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Recto
                          </label>
                          <div
                            className="relative border-2 border-dashed border-gray-600 rounded-2xl p-4 text-center cursor-pointer hover:border-[#e87428] transition-colors"
                            onClick={() => idFrontRef.current?.click()}
                          >
                            {idFrontPreview ? (
                              <div className="relative">
                                <img src={idFrontPreview} alt="Recto" className="max-h-40 mx-auto rounded-lg" />
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeFile('front'); }}
                                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="py-8">
                                <FaImage className="text-4xl text-gray-500 mx-auto mb-2" />
                                <p className="text-gray-400">Cliquez ou glissez une image</p>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
                              </div>
                            )}
                            <input
                              type="file"
                              ref={idFrontRef}
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'front')}
                              className="hidden"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Verso
                          </label>
                          <div
                            className="relative border-2 border-dashed border-gray-600 rounded-2xl p-4 text-center cursor-pointer hover:border-[#e87428] transition-colors"
                            onClick={() => idBackRef.current?.click()}
                          >
                            {idBackPreview ? (
                              <div className="relative">
                                <img src={idBackPreview} alt="Verso" className="max-h-40 mx-auto rounded-lg" />
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeFile('back'); }}
                                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="py-8">
                                <FaImage className="text-4xl text-gray-500 mx-auto mb-2" />
                                <p className="text-gray-400">Cliquez ou glissez une image</p>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
                              </div>
                            )}
                            <input
                              type="file"
                              ref={idBackRef}
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'back')}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group w-full py-4 px-6 bg-linear-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      {isLoading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-5 h-5" />
                          <span>Soumettre ma demande</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Étape 4 : Succès */}
              {step === 'success' && (
                <div className="text-center">
                  <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-green-400 font-medium text-xl">Inscription réussie !</p>
                        <p className="text-green-300 mt-2">
                         {" Votre demande est en attente de vérification. Vous recevrez une notification dès qu'elle sera approuvée."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <AppRedirectButtons />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}