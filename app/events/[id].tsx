// pages/events/[id].tsx  (ou app/events/[id]/page.tsx si App Router)
// Place ce fichier dans : pages/events/[id].tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.arsprod01.eventick";
const IOS_STORE =
  "https://apps.apple.com/app/id6758682794";
const SCHEME = "eventick"; // ton scheme dans app.json

export default function EventDeepLinkPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [attempted, setAttempted] = useState(false);

  // Récupère les infos de l'événement pour le preview (OG tags etc.)
  useEffect(() => {
    if (!id) return;
    fetch(`https://eventick.onrender.com/api/events/${id}`)
      .then((r) => r.json())
      .then(setEvent)
      .catch(() => {});
  }, [id]);

  // Tente d'ouvrir l'app dès que la page est prête
  useEffect(() => {
    if (!id || attempted) return;
    setAttempted(true);

    // 1. Tente Universal Link / App Link (fonctionne si app installée)
    //    Le navigateur gère ça automatiquement via les fichiers .well-known
    //    On tente aussi le scheme custom en fallback
    const deepLink = `${SCHEME}://events/${id}`;
    window.location.href = deepLink;

    // 2. Si l'app n'est pas installée, le scheme échoue silencieusement.
    //    On attend 2s puis on laisse l'utilisateur choisir son store.
  }, [id, attempted]);

  const isIOS = () =>
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = () =>
    typeof navigator !== "undefined" && /Android/.test(navigator.userAgent);

  const handleDownload = () => {
    if (isIOS()) window.open(IOS_STORE, "_blank");
    else if (isAndroid()) window.open(ANDROID_STORE, "_blank");
    else {
      // Desktop : affiche les deux
      window.open(IOS_STORE, "_blank");
    }
  };

  const title = event?.title || "Événement Eventick";
  const description = event?.description || "Découvrez cet événement sur Eventick.";
  const image = event?.image || "https://eventick.novatrix.dev/og-default.png";
  const date = event?.date
    ? new Date(event.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      <Head>
        <title>{title} — Eventick</title>
        <meta name="description" content={description} />
        {/* Open Graph (WhatsApp, Facebook, etc.) */}
        <meta property="og:title" content={`${title} — Eventick`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://eventick.novatrix.dev/events/${id}`}
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {/* Deep link mobile */}
        <meta
          name="apple-itunes-app"
          content={`app-id=6758682794, app-argument=eventick://events/${id}`}
        />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0d2526 0%, #0a1f20 60%, #091518 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "24px",
          color: "white",
        }}
      >
        {/* Logo / Brand */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#68f2f4",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Eventick
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4 }}>
            by Novatrix
          </p>
        </div>

        {/* Event card preview */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(104,242,244,0.2)",
            borderRadius: 24,
            padding: 24,
            maxWidth: 380,
            width: "100%",
            marginBottom: 32,
          }}
        >
          {event?.image && (
            <img
              src={event.image}
              alt={title}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 16,
                marginBottom: 16,
              }}
            />
          )}
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              margin: "0 0 8px",
              color: "white",
            }}
          >
            {title}
          </h2>
          {date && (
            <p style={{ color: "#68f2f4", fontSize: 14, margin: "0 0 6px" }}>
              📅 {date}
            </p>
          )}
          {event?.location && (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>
              📍 {event.location}, {event.city}
            </p>
          )}
        </div>

        {/* CTA principal */}
        <button
          onClick={handleDownload}
          style={{
            background: "#ec673b",
            color: "white",
            border: "none",
            borderRadius: 16,
            padding: "18px 40px",
            fontSize: 17,
            fontWeight: 800,
            cursor: "pointer",
            marginBottom: 16,
            width: "100%",
            maxWidth: 380,
          }}
        >
          📲 Ouvrir dans Eventick
        </button>

        {/* Stores séparés sur desktop */}
        {!isIOS() && !isAndroid() && (
          <div
            style={{
              display: "flex",
              gap: 12,
              maxWidth: 380,
              width: "100%",
              marginBottom: 16,
            }}
          >
            <a
              href={IOS_STORE}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "12px 0",
                textAlign: "center",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              🍎 App Store
            </a>
            <a
              href={ANDROID_STORE}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "12px 0",
                textAlign: "center",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              🤖 Google Play
            </a>
          </div>
        )}

        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center" }}>
          Si l'app est déjà installée, elle s'ouvrira automatiquement.
        </p>
      </main>
    </>
  );
}