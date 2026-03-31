import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.arsprod01.eventick";
const IOS_STORE = "https://apps.apple.com/app/id6758682794";
const SCHEME = "eventick";

// ✅ Type propre (remplace any)
type EventType = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
  location?: string;
  city?: string;
};

export default function EventDeepLinkPage() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<EventType | null>(null);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://eventick.onrender.com/api/events/${id}`)
      .then((r) => r.json())
      .then((data: EventType) => setEvent(data))
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id || attempted) return;
    setAttempted(true);

    const deepLink = `${SCHEME}://events/${id}`;
    window.location.href = deepLink;
  }, [id, attempted]);

  const isIOS = () =>
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isAndroid = () =>
    typeof navigator !== "undefined" &&
    /Android/.test(navigator.userAgent);

  const handleDownload = () => {
    if (isIOS()) window.open(IOS_STORE, "_blank");
    else if (isAndroid()) window.open(ANDROID_STORE, "_blank");
    else window.open(IOS_STORE, "_blank");
  };

  const title = event?.title || "Événement Eventick";
  const description =
    event?.description || "Découvrez cet événement sur Eventick.";
  const image =
    event?.image || "https://eventick.novatrix.dev/og-default.png";

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

        <meta property="og:title" content={`${title} — Eventick`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://eventick.novatrix.dev/events/${id}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta
          name="apple-itunes-app"
          content={`app-id=6758682794, app-argument=eventick://events/${id}`}
        />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0d2526 0%, #0a1f20 60%, #091518 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "24px",
          color: "white",
        }}
      >
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#68f2f4",
              margin: 0,
            }}
          >
            Eventick
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            by Novatrix
          </p>
        </div>

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
            <Image
              src={event.image}
              alt={title}
              width={380}
              height={180}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 16,
                marginBottom: 16,
              }}
            />
          )}

          <h2 style={{ fontSize: 22, fontWeight: 800 }}>
            {title}
          </h2>

          {date && (
            <p style={{ color: "#68f2f4", fontSize: 14 }}>
              📅 {date}
            </p>
          )}

          {event?.location && (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              📍 {event.location}, {event.city}
            </p>
          )}
        </div>

        <button
          onClick={handleDownload}
          style={{
            background: "#ec673b",
            borderRadius: 16,
            padding: "18px 40px",
            fontWeight: 800,
            cursor: "pointer",
            width: "100%",
            maxWidth: 380,
          }}
        >
          📲 Ouvrir dans Eventick
        </button>

        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          {/* ✅ FIX apostrophe */}
          Si l&apos;app est déjà installée, elle s&apos;ouvrira automatiquement.
        </p>
      </main>
    </>
  );
}