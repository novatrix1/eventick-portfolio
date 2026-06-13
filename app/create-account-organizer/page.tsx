"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaBuilding,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUser,
  FaKey,
  FaMapMarkerAlt,
  FaTag,
  FaIdCard,
  FaImage,
  FaTrash,
  FaUniversity,
} from "react-icons/fa";

/* ─── Constants ─────────────────────────────────────────── */
const API = "https://eventick.onrender.com";

const CATEGORIES = [
  "Concerts",
  "Festivals",
  "Conférences",
  "Ateliers",
  "Sports",
  "Arts",
  "Théâtre",
  "Expositions",
  "Formations",
  "Autre",
];

const ORGANIZER_TYPES = [
  { value: "organization", label: "Entreprise" },
  { value: "particular", label: "Individuel" },
];

const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.arsprod01.eventick";
const IOS_STORE = "https://apps.apple.com/app/id6758682794";

/* ─── Helpers ────────────────────────────────────────────── */
function isIOS() {
  return (
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
}
function isAndroid() {
  return (
    typeof navigator !== "undefined" && /Android/.test(navigator.userAgent)
  );
}
function isMobile() {
  return isIOS() || isAndroid();
}

/* ─── AppRedirectButtons ─────────────────────────────────── */
const AppRedirectButtons = () => {
  const handleOpenApp = () => {
    if (isMobile()) {
      window.location.href = "eventick://organizer/verify";
      setTimeout(() => {
        if (isIOS()) window.open(IOS_STORE, "_blank");
        else window.open(ANDROID_STORE, "_blank");
      }, 2500);
    } else {
      window.open(IOS_STORE, "_blank");
    }
  };

  return (
    <div className="mt-8 text-center space-y-4">
      <button
        onClick={handleOpenApp}
        className="group w-full max-w-md mx-auto py-4 px-6 bg-gradient-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
      >
        <Image
          src="/eventick-icon.svg"
          alt="Eventick"
          width={24}
          height={24}
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <span>
          {isMobile() ? "Ouvrir dans Eventick" : "Télécharger Eventick"}
        </span>
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>
      <div className="flex gap-4 justify-center">
        <a
          href={IOS_STORE}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-white hover:border-[#e87428]/50 transition-all"
        >
          <Image
            src="/Apple.svg"
            alt="App Store"
            width={20}
            height={20}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          App Store
        </a>
        <a
          href={ANDROID_STORE}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-white hover:border-[#e87428]/50 transition-all"
        >
          <Image
            src="/google-play-icon.svg"
            alt="Google Play"
            width={20}
            height={20}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          Google Play
        </a>
      </div>
    </div>
  );
};

/* ─── Step indicator ─────────────────────────────────────── */
type Step = "register" | "verify" | "organizer" | "success";

const STEPS: { key: Step; label: string }[] = [
  { key: "register", label: "Compte" },
  { key: "verify", label: "Vérification" },
  { key: "organizer", label: "Profil" },
  { key: "success", label: "Terminé" },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center mb-8 gap-0">
      {STEPS.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${i < idx ? "bg-[#e87428] text-white" : i === idx ? "bg-[#e87428] text-white ring-4 ring-[#e87428]/30" : "bg-gray-700 text-gray-400"}`}
            >
              {i < idx ? <FaCheck className="w-3 h-3" /> : i + 1}
            </div>
            <span
              className={`mt-1 text-[10px] font-medium ${i <= idx ? "text-[#e87428]" : "text-gray-500"}`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-12 mx-1 mb-4 transition-all ${i < idx ? "bg-[#e87428]" : "bg-gray-700"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Reusable alert ─────────────────────────────────────── */
function Alert({ type, msg }: { type: "error" | "success"; msg: string }) {
  if (!msg) return null;
  const isErr = type === "error";
  return (
    <div
      className={`mb-6 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-sm
      ${isErr ? "bg-red-500/10 border border-red-500/20" : "bg-green-500/10 border border-green-500/20"}`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isErr ? "bg-red-500" : "bg-green-500"}`}
      >
        {isErr ? (
          <FaTimes className="w-3 h-3 text-white" />
        ) : (
          <FaCheck className="w-3 h-3 text-white" />
        )}
      </div>
      <p
        className={`text-sm leading-relaxed ${isErr ? "text-red-400" : "text-green-400"}`}
      >
        {msg}
      </p>
    </div>
  );
}

/* ─── Field wrapper ──────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-[#e87428] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white placeholder-gray-500 rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent outline-none transition-all";
const iconInputCls =
  "w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-white placeholder-gray-500 rounded-2xl focus:ring-2 focus:ring-[#e87428] focus:border-transparent outline-none transition-all";

/* ─── Submit button ──────────────────────────────────────── */
function SubmitBtn({
  loading,
  label,
  loadingLabel,
  icon: Icon,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
  icon: React.ElementType;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 px-6 bg-gradient-to-r from-[#e87428] to-[#ff9a3d] text-white font-semibold rounded-2xl shadow-2xl hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function BecomeOrganizerPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>("register");

  // Auth state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Organizer form
  const [org, setOrg] = useState({
    companyName: "",
    address: "",
    phone: "",
    type: "",
    website: "",
    description: "",
    contactEmail: "",
    banque: "",
    rib: "",
    categories: [] as string[],
    socialMedia: { facebook: "", twitter: "", instagram: "", linkedin: "" },
  });

  // Pièce d'identité
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);

  const handleIdFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (side === "front") {
      setIdFrontFile(file);
      setIdFrontPreview(preview);
    } else {
      setIdBackFile(file);
      setIdBackPreview(preview);
    }
  };

  const removeIdFile = (side: "front" | "back") => {
    if (side === "front") {
      setIdFrontFile(null);
      if (idFrontPreview) URL.revokeObjectURL(idFrontPreview);
      setIdFrontPreview(null);
      if (idFrontRef.current) idFrontRef.current.value = "";
    } else {
      setIdBackFile(null);
      if (idBackPreview) URL.revokeObjectURL(idBackPreview);
      setIdBackPreview(null);
      if (idBackRef.current) idBackRef.current.value = "";
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  /* ── Handlers ── */
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleOrgChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setOrg((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setOrg((p) => ({
      ...p,
      socialMedia: { ...p.socialMedia, [platform]: value },
    }));
  };

  const handleCategoryToggle = (cat: string) => {
    setOrg((p) => ({
      ...p,
      categories: p.categories.includes(cat)
        ? p.categories.filter((c) => c !== cat)
        : [...p.categories, cat],
    }));
  };

  /* ────────────────────────────────────────────────────────
     ÉTAPE 1 : Inscription
  ──────────────────────────────────────────────────────── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        }),
      });
      const data = await res.json();
      console.log("Status:", res.status);
      console.log("Response:", JSON.stringify(data));
      if (res.ok) {
        setUserId(data.userId);
        setSuccessMessage(
          "Un code de vérification a été envoyé à votre email.",
        );
        setStep("verify");
      } else {
        setErrorMessage(data.message || "Erreur lors de l'inscription.");
      }
    } catch {
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ────────────────────────────────────────────────────────
     ÉTAPE 2 : Vérification OTP
  ──────────────────────────────────────────────────────── */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!otp.trim()) {
      setErrorMessage("Veuillez saisir le code OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const verifyRes = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setErrorMessage(verifyData.message || "Code OTP invalide ou expiré.");
        setIsLoading(false);
        return;
      }

      const loginRes = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setErrorMessage(
          loginData.message || "Erreur de connexion après vérification.",
        );
        setIsLoading(false);
        return;
      }

      setToken(loginData.token);
      setOrg((p) => ({
        ...p,
        companyName: userData.name,
        phone: userData.phone,
        contactEmail: userData.email,
      }));
      setStep("organizer");
    } catch {
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    clearMessages();
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Un nouveau code a été envoyé à votre email.");
        if (data.userId) setUserId(data.userId);
      } else {
        setErrorMessage(data.message || "Erreur lors du renvoi du code.");
      }
    } catch {
      setErrorMessage("Erreur réseau.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ────────────────────────────────────────────────────────
     ÉTAPE 3 : Profil organisateur
  ──────────────────────────────────────────────────────── */
  const handleSubmitOrganizer = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!org.companyName || !org.phone || !org.contactEmail || !org.type) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }
    if (!idFrontFile || !idBackFile) {
      setErrorMessage(
        "Veuillez télécharger les deux faces de votre pièce d'identité.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const body = new FormData();
      body.append("companyName", org.companyName);
      body.append("address", org.address);
      body.append("phone", org.phone);
      body.append("type", org.type);
      body.append("website", org.website);
      body.append("description", org.description);
      body.append("contactEmail", org.contactEmail);
      body.append("banque", org.banque);
      body.append("rib", org.rib);
      body.append("categories", JSON.stringify(org.categories));

      // socialMedia — envoyer uniquement les réseaux renseignés, format tableau
      const socialEntries = Object.entries(org.socialMedia).filter(
        ([, v]) => v.trim() !== "",
      );
      body.append(
        "socialMedia",
        JSON.stringify(socialEntries.map(([type, url]) => ({ type, url }))),
      );

      body.append("idFront", idFrontFile, idFrontFile.name);
      body.append("idBack", idBackFile, idBackFile.name);

      const res = await fetch(`${API}/api/organizers/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const data = await res.json();

      if (res.ok) {
        setStep("success");
      } else {
        setErrorMessage(
          data.message || "Une erreur est survenue. Vérifiez vos informations.",
        );
      }
    } catch {
      setErrorMessage(
        "Erreur de connexion au serveur. Réessayez dans quelques instants.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#e87428]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#e87428]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero */}
      <section className="py-16 text-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e87428]/10 border border-[#e87428]/30 mb-6">
              <span className="text-sm font-medium text-[#e87428]">
                Devenir organisateur
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Organisez des événements{" "}
              <span className="text-[#e87428]">inoubliables</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rejoignez notre plateforme et créez, gérez et promouvez vos
              événements.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
              {step !== "success" && <StepBar current={step} />}

              {/* ═══ ÉTAPE 1 : Compte ═══ */}
              {step === "register" && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Créez votre compte
                    </h2>
                    <p className="text-gray-400">
                      Un code de vérification vous sera envoyé par email.
                    </p>
                  </div>
                  <Alert type="error" msg={errorMessage} />
                  <Alert type="success" msg={successMessage} />
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Nom complet" required>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleUserChange}
                            required
                            placeholder="Votre nom"
                            className={iconInputCls}
                          />
                        </div>
                      </Field>
                      <Field label="Email" required>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleUserChange}
                            required
                            placeholder="votre@email.com"
                            className={iconInputCls}
                          />
                        </div>
                      </Field>
                    </div>
                    <Field label="Téléphone" required>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleUserChange}
                          required
                          placeholder="+222 XX XX XX XX"
                          className={iconInputCls}
                        />
                      </div>
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Mot de passe" required>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleUserChange}
                            required
                            placeholder="••••••••"
                            minLength={6}
                            className={iconInputCls}
                          />
                        </div>
                      </Field>
                      <Field label="Confirmer le mot de passe" required>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleUserChange}
                            required
                            placeholder="••••••••"
                            minLength={6}
                            className={iconInputCls}
                          />
                        </div>
                      </Field>
                    </div>
                    <SubmitBtn
                      loading={isLoading}
                      label="Créer mon compte"
                      loadingLabel="Création en cours…"
                      icon={FaPaperPlane}
                    />
                  </form>
                </>
              )}

              {/* ═══ ÉTAPE 2 : OTP ═══ */}
              {step === "verify" && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Vérification
                    </h2>
                    <p className="text-gray-400">
                      Un code à 6 chiffres a été envoyé à{" "}
                      <span className="text-white font-medium">
                        {userData.email}
                      </span>
                      .
                    </p>
                  </div>
                  <Alert type="error" msg={errorMessage} />
                  <Alert type="success" msg={successMessage} />
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <Field label="Code de vérification" required>
                      <div className="relative">
                        <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          inputMode="numeric"
                          maxLength={6}
                          required
                          placeholder="123456"
                          className={`${iconInputCls} tracking-[0.5em] text-center text-xl font-bold`}
                        />
                      </div>
                    </Field>
                    <SubmitBtn
                      loading={isLoading}
                      label="Vérifier mon compte"
                      loadingLabel="Vérification…"
                      icon={FaCheck}
                    />
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-[#e87428] hover:text-[#ff9a3d] text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        Renvoyer le code
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* ═══ ÉTAPE 3 : Profil organisateur ═══ */}
              {step === "organizer" && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Profil organisateur
                    </h2>
                    <p className="text-gray-400">
                      Complétez ces informations pour finaliser votre
                      inscription.
                    </p>
                  </div>
                  <Alert type="error" msg={errorMessage} />

                  <form onSubmit={handleSubmitOrganizer} className="space-y-8">
                    {/* Informations générales */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <FaBuilding className="text-[#e87428]" />
                        Informations générales
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Nom de l'organisation" required>
                          <input
                            type="text"
                            name="companyName"
                            value={org.companyName}
                            onChange={handleOrgChange}
                            required
                            placeholder="Ex : Eventick Production"
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Type d'organisation" required>
                          <select
                            name="type"
                            value={org.type}
                            onChange={handleOrgChange}
                            required
                            className={`${inputCls} appearance-none`}
                          >
                            <option value="" disabled>
                              Sélectionnez…
                            </option>
                            {ORGANIZER_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Téléphone" required>
                          <div className="relative">
                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="tel"
                              name="phone"
                              value={org.phone}
                              onChange={handleOrgChange}
                              required
                              placeholder="+222 XX XX XX XX"
                              className={iconInputCls}
                            />
                          </div>
                        </Field>
                        <Field label="Email de contact" required>
                          <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                              type="email"
                              name="contactEmail"
                              value={org.contactEmail}
                              onChange={handleOrgChange}
                              required
                              placeholder="contact@organisation.com"
                              className={iconInputCls}
                            />
                          </div>
                        </Field>
                      </div>

                      <Field label="Adresse">
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400 text-sm" />
                          <textarea
                            name="address"
                            rows={2}
                            value={org.address}
                            onChange={handleOrgChange}
                            placeholder="Rue, code postal, ville, pays"
                            className={`${inputCls} pl-10 resize-none`}
                          />
                        </div>
                      </Field>

                      <Field label="Site web">
                        <div className="relative">
                          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="url"
                            name="website"
                            value={org.website}
                            onChange={handleOrgChange}
                            placeholder="https://www.votre-site.com"
                            className={iconInputCls}
                          />
                        </div>
                      </Field>

                      <Field label="Description de votre activité">
                        <textarea
                          name="description"
                          rows={4}
                          value={org.description}
                          onChange={handleOrgChange}
                          placeholder="Présentez votre organisation, votre expérience dans l'événementiel…"
                          className={`${inputCls} resize-none`}
                        />
                      </Field>
                    </div>

                    {/* Informations bancaires */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <FaUniversity className="text-[#e87428]" />
                        Informations bancaires{" "}
                        <span className="text-sm font-normal text-gray-400">
                          (optionnel)
                        </span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Banque">
                          <input
                            type="text"
                            name="banque"
                            value={org.banque}
                            onChange={handleOrgChange}
                            placeholder="Ex : Banque Populaire de Mauritanie"
                            className={inputCls}
                          />
                        </Field>
                        <Field label="RIB">
                          <input
                            type="text"
                            name="rib"
                            value={org.rib}
                            onChange={handleOrgChange}
                            placeholder="Votre RIB"
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <FaGlobe className="text-[#e87428]" />
                        Réseaux sociaux{" "}
                        <span className="text-sm font-normal text-gray-400">
                          (optionnel)
                        </span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                          {
                            platform: "facebook",
                            Icon: FaFacebook,
                            color: "text-blue-500",
                            label: "Facebook",
                          },
                          {
                            platform: "twitter",
                            Icon: FaTwitter,
                            color: "text-sky-400",
                            label: "Twitter",
                          },
                          {
                            platform: "instagram",
                            Icon: FaInstagram,
                            color: "text-pink-500",
                            label: "Instagram",
                          },
                          {
                            platform: "linkedin",
                            Icon: FaLinkedin,
                            color: "text-blue-700",
                            label: "LinkedIn",
                          },
                        ].map(({ platform, Icon, color, label }) => (
                          <div
                            key={platform}
                            className="flex items-center gap-3"
                          >
                            <Icon
                              className={`${color} text-xl flex-shrink-0`}
                            />
                            <input
                              type="url"
                              placeholder={label}
                              value={
                                org.socialMedia[
                                  platform as keyof typeof org.socialMedia
                                ]
                              }
                              onChange={(e) =>
                                handleSocialChange(platform, e.target.value)
                              }
                              className={inputCls}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Catégories */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <FaTag className="text-[#e87428]" />
                        {"Catégories d'événements"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                          const selected = org.categories.includes(cat);
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleCategoryToggle(cat)}
                              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                                ${
                                  selected
                                    ? "bg-[#e87428] border-[#e87428] text-white"
                                    : "border-gray-600 text-gray-400 hover:border-[#e87428]/50 hover:text-white"
                                }`}
                            >
                              {selected && (
                                <FaCheck className="inline w-3 h-3 mr-1.5" />
                              )}
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pièce d'identité */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700/50">
                        <FaIdCard className="text-[#e87428]" />
                        {"Pièce d'identité"}{" "}
                        <span className="text-[#e87428] ml-1 text-sm">*</span>
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Fournissez les deux faces de votre pièce {"d'identité"}
                        (CNI, passeport…). Ces documents restent confidentiels
                        et servent uniquement à la vérification de votre compte.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {(["front", "back"] as const).map((side) => {
                          const file =
                            side === "front" ? idFrontFile : idBackFile;
                          const preview =
                            side === "front" ? idFrontPreview : idBackPreview;
                          const ref = side === "front" ? idFrontRef : idBackRef;
                          const label =
                            side === "front"
                              ? "Recto (face avant)"
                              : "Verso (face arrière)";
                          return (
                            <div key={side}>
                              <p className="text-sm font-medium text-gray-300 mb-2">
                                {label}
                              </p>
                              <div
                                className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all
                                  ${preview ? "border-[#e87428]/50 bg-[#e87428]/5" : "border-gray-600 hover:border-[#e87428]/50 hover:bg-gray-800/50"}`}
                                onClick={() => ref.current?.click()}
                              >
                                {preview ? (
                                  <div className="relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={preview}
                                      alt={label}
                                      className="max-h-36 mx-auto rounded-lg object-contain"
                                    />
                                    <button
                                      type="button"
                                      onClick={(ev) => {
                                        ev.stopPropagation();
                                        removeIdFile(side);
                                      }}
                                      className="absolute top-1 right-1 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                                    >
                                      <FaTrash className="w-3 h-3 text-white" />
                                    </button>
                                    <p className="text-xs text-[#e87428] mt-2 font-medium">
                                      {file?.name}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="py-8">
                                    <FaImage className="text-3xl text-gray-500 mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">
                                      Cliquez pour ajouter
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      JPG, PNG, WEBP · max 5 MB
                                    </p>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  ref={ref}
                                  accept="image/*"
                                  onChange={(ev) =>
                                    handleIdFileChange(ev, side)
                                  }
                                  className="hidden"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <SubmitBtn
                      loading={isLoading}
                      label="Soumettre ma demande"
                      loadingLabel="Envoi en cours…"
                      icon={FaPaperPlane}
                    />
                  </form>
                </>
              )}

              {/* ═══ ÉTAPE 4 : Succès ═══ */}
              {step === "success" && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                    <FaCheck className="w-9 h-9 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Demande envoyée !
                  </h2>
                  <p className="text-gray-300 mb-2">
                    Votre dossier est en cours {"d'examen "}par notre équipe.
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    Vous recevrez une notification dès que votre compte
                    organisateur sera approuvé. Téléchargez {"l'application"}
                    Eventick pour suivre{" l'avancement."}
                  </p>
                  <div className="p-4 bg-[#e87428]/10 border border-[#e87428]/20 rounded-2xl mb-6 text-left">
                    <p className="text-[#e87428] text-sm font-medium mb-1">
                      ⏱ Délai de traitement
                    </p>
                    <p className="text-gray-400 text-sm">
                      Notre équipe examine les demandes sous 24 à 48 heures
                      ouvrables.
                    </p>
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
