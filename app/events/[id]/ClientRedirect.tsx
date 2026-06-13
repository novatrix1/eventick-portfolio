// app/events/[id]/ClientRedirect.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=com.arsprod01.eventick";
const IOS_STORE = "https://apps.apple.com/app/id6758682794";

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

export default function ClientRedirect({ eventId }: { eventId: string }) {
  const [appOpened, setAppOpened] = useState(false);

  // Redirection automatique vers l'application
  useEffect(() => {
    if (!eventId || appOpened || !isMobile()) return;
    setAppOpened(true);
    window.location.href = `eventick://event/${eventId}`;
  }, [eventId, appOpened]);

  const handleOpenApp = () => {
    if (isMobile()) {
      window.location.href = `eventick://event/${eventId}`;
      setTimeout(() => {
        if (isIOS()) window.open(IOS_STORE, "_blank");
        else window.open(ANDROID_STORE, "_blank");
      }, 2500);
    } else {
      window.open(IOS_STORE, "_blank");
    }
  };

  return (
    <>
      <button
        onClick={handleOpenApp}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 18,
          padding: "18px 24px",
          fontSize: 16,
          fontWeight: 800,
          cursor: "pointer",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          color: "white",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <Image
          src="/eventick-icon.svg"
          alt="Eventick"
          width={24}
          height={24}
          style={{ filter: "brightness(0) invert(1)" }}
        />
        {isMobile() ? "Ouvrir dans Eventick" : "Télécharger Eventick"}
      </button>

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
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            padding: "12px 0",
            textAlign: "center",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
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
          style={{
            flex: 1,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            padding: "12px 0",
            textAlign: "center",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
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
    </>
  );
}