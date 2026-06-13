// app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import ClientRedirect from "./ClientRedirect";

const API_URL = "https://eventick.onrender.com";
const BASE_URL = "https://eventick.novatrix.dev"; // domaine de votre site

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

// Récupération d'un événement (côté serveur)
async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/${id}`, {
      next: { revalidate: 3600 }, // ISR : regénération toutes les heures
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur fetch event:", error);
    return null;
  }
}

// Génération des métadonnées (balises OG, titre, description)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return {
      title: "Événement non trouvé",
      description: "Cet événement n'existe pas.",
    };
  }

  // Construction de l'URL absolue de l'image
  const imageUrl = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `${API_URL}${event.image}` // Si l'image est sur le même serveur
    : `${BASE_URL}/default-event-image.jpg`; // Image par défaut

  return {
    title: `${event.title} — Eventick`,
    description: event.description,
    openGraph: {
      title: `${event.title} — Eventick`,
      description: event.description,
      images: [imageUrl],
      url: `${BASE_URL}/events/${params.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} — Eventick`,
      description: event.description,
      images: [imageUrl],
    },
    // Bannière App Store pour iOS
    other: {
      "apple-itunes-app": `app-id=6758682794, app-argument=eventick://event/${params.id}`,
    },
  };
}

// Composant principal (Server Component)
export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  if (!event) {
    notFound(); // Affiche la page 404 si l'événement n'existe pas
  }

  // Calcul du prix minimum
  const minPrice =
    event.ticket && event.ticket.length > 0
      ? Math.min(...event.ticket.map((t) => t.price))
      : null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
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
          <span
            style={{
              fontSize: 12,
              color: "#68f2f4",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
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
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
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
        <div
          style={{ height: 3, background: "linear-gradient(90deg, #68f2f4, #ec673b)" }}
        />

        {/* Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              margin: "0 0 12px",
              lineHeight: 1.3,
              color: "white",
            }}
          >
            {event.title}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {event.date && (
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
            {event.location && (
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
        </div>
      </div>

      {/* Composant client pour la redirection et les boutons */}
      <ClientRedirect eventId={event._id} />
    </main>
  );
}