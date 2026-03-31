"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.arsprod01.eventick";
const IOS_STORE = "https://apps.apple.com/app/id6758682794";
const API_URL = "https://eventick.onrender.com";

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  date: string;
  image?: string;
  ticket?: { price: number }[];
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
function isAndroid() {
  if (typeof navigator === "undefined") return false;
  return /Android/.test(navigator.userAgent);
}
function isMobile() {
  return isIOS() || isAndroid();
}

export default function EventPage() {
  const params = useParams();
  const id = params?.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [appOpened, setAppOpened] = useState(false);

  // 1. Fetch event data
  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 2. Tente d'ouvrir l'app via scheme custom
  useEffect(() => {
    if (!id || appOpened || !isMobile()) return;
    setAppOpened(true);

    // Tente le scheme custom eventick://
    const deepLink = `eventick://events/${id}`;
    window.location.href = deepLink;

    // Les Universal Links / App Links se déclenchent automatiquement
    // via les fichiers .well-known si l'app est installée — pas besoin de JS
  }, [id, appOpened]);

  const handleOpenApp = () => {
    if (isMobile()) {
      // Tente d'ouvrir l'app
      window.location.href = `eventick://events/${id}`;
      // Fallback store après 2.5s si l'app n'est pas installée
      setTimeout(() => {
        if (isIOS()) window.open(IOS_STORE, "_blank");
        else window.open(ANDROID_STORE, "_blank");
      }, 2500);
    } else {
      // Desktop : ouvre les deux stores
      window.open(IOS_STORE, "_blank");
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const minPrice =
    event?.ticket && event.ticket.length > 0
      ? Math.min(...event.ticket.map((t) => t.price))
      : null;

  const title = event?.title || "Événement Eventick";
  const description = event?.description || "Découvrez cet événement sur Eventick.";
  const imageUrl = event?.image || "";
  const shareUrl = `https://eventick.novatrix.dev/events/${id}`;

  return (
    <>
      {/* Meta OG pour WhatsApp / réseaux sociaux */}
      {event && (
        <Head>
          <title>{title} — Eventick</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={`${title} — Eventick`} />
          <meta property="og:description" content={description} />
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="apple-itunes-app"
            content={`app-id=6758682794, app-argument=eventick://events/${id}`}
          />
        </Head>
      )}

      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #0d2526 0%, #0a1a1b 50%, #061213 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "white",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(104,242,244,0.08)",
              border: "1px solid rgba(104,242,244,0.2)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#68f2f4", fontWeight: 700, letterSpacing: 2 }}>
              EVENTICK
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>
            by Novatrix
          </p>
        </div>

        {/* Event card */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(104,242,244,0.15)",
            borderRadius: 24,
            overflow: "hidden",
            width: "100%",
            maxWidth: 400,
            marginBottom: 24,
          }}
        >
          {/* Image */}
          {loading ? (
            <div
              style={{
                height: 200,
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
                Chargement...
              </div>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                height: 200,
                background: "rgba(104,242,244,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
              }}
            >
              🎟️
            </div>
          )}

          {/* Barre colorée */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #68f2f4, #ec673b)" }} />

          {/* Content */}
          <div style={{ padding: "20px 20px 24px" }}>
            {loading ? (
              <>
                <div style={{ height: 24, background: "rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 12 }} />
                <div style={{ height: 16, width: "60%", background: "rgba(255,255,255,0.05)", borderRadius: 8 }} />
              </>
            ) : (
              <>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    margin: "0 0 12px",
                    lineHeight: 1.3,
                    color: "white",
                  }}
                >
                  {title}
                </h1>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {event?.date && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          background: "rgba(104,242,244,0.12)",
                          borderRadius: 8,
                          padding: "4px 8px",
                          fontSize: 13,
                          color: "#68f2f4",
                          fontWeight: 600,
                        }}
                      >
                        📅 {formatDate(event.date)}
                      </span>
                    </div>
                  )}
                  {event?.location && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 8,
                          padding: "4px 8px",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        📍 {event.location}, {event.city}
                      </span>
                    </div>
                  )}
                  {minPrice !== null && (
                    <div>
                      <span
                        style={{
                          background: "rgba(236,103,59,0.15)",
                          borderRadius: 8,
                          padding: "4px 8px",
                          fontSize: 13,
                          color: "#ec673b",
                          fontWeight: 700,
                        }}
                      >
                        🎫 À partir de {minPrice} MRU
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA principal */}
        <button
          onClick={handleOpenApp}
          style={{
            width: "100%",
            maxWidth: 400,
            background: "linear-gradient(135deg, #ec673b, #d4522a)",
            color: "white",
            border: "none",
            borderRadius: 18,
            padding: "18px 24px",
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 8px 32px rgba(236,103,59,0.3)",
          }}
        >
          <span style={{ fontSize: 20 }}>📲</span>
          {isMobile() ? "Ouvrir dans Eventick" : "Télécharger Eventick"}
        </button>

        {/* Stores séparés */}
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            maxWidth: 400,
            marginBottom: 20,
          }}
        >
          <a
            href={IOS_STORE}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 0",
              textAlign: "center",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              display: "block",
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
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 0",
              textAlign: "center",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              display: "block",
            }}
          >
            🤖 Google Play
          </a>
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: 12,
            textAlign: "center",
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          Si Eventick est déjà installé,{" il s'ouvrira automatiquement."}
        </p>
      </main>
    </>
  );
}