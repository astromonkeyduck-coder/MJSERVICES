import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;

  let bgSrc: string | null = null;
  try {
    const res = await fetch(`${origin}/images/cherrrrrr2.jpg`);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      bgSrc = `data:image/jpeg;base64,${btoa(binary)}`;
    }
  } catch {
    // fallback to gradient
  }

  const [greatVibesFont, dmSansFont, cormorantFont] = await Promise.all([
    fetch("https://fonts.gstatic.com/s/greatvibes/v21/RWmMoKWR9v4ksMfaWd_JN-XC.ttf").then((r) => r.arrayBuffer()),
    fetch("https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf").then((r) => r.arrayBuffer()),
    fetch("https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf").then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "DM Sans, sans-serif",
          background: bgSrc
            ? "#1a1f26"
            : "linear-gradient(135deg, #1a1f26 0%, #2a3038 40%, #1e2328 100%)",
        }}
      >
        {bgSrc && (
          <img
            src={bgSrc}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
          />
        )}
        {bgSrc && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              background: "rgba(0,0,0,0.35)",
            }}
          />
        )}
        {/* Cast shadow behind card */}
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 360,
            borderRadius: 18,
            background: "rgba(0,0,0,0.5)",
            transform: "rotate(-4deg) translate(10px, 16px)",
          }}
        />
        {/* Card */}
        <div
          style={{
            display: "flex",
            width: 620,
            height: 360,
            background: "#F7F4EE",
            borderRadius: 18,
            border: "1px solid rgba(143,190,142,0.4)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.25), 0 48px 80px rgba(0,0,0,0.5)",
            overflow: "hidden",
            position: "relative",
            transform: "rotate(-4deg)",
          }}
        >
          {/* Left column */}
          <div
            style={{
              flex: 1,
              padding: "32px 28px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 36, color: "#2F3439", fontWeight: 400, fontFamily: "Cormorant Garamond" }}>
                Marcel Joseph
              </span>
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  color: "#4E545C",
                  marginTop: 4,
                  textTransform: "uppercase" as const,
                }}
              >
                CEO & Co-Founder
              </span>
              <div style={{ width: 44, height: 3, background: "#8FBE8E", marginTop: 10, borderRadius: 2 }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 15,
                color: "#4E545C",
              }}
            >
              <span>(321) 427-5709</span>
              <span>(321) 872-5693</span>
              <span>info@mjconciergeservices.com</span>
              <span style={{ fontSize: 14 }}>1317 Edgewater Dr. Suite 1276, Orlando, FL 32804</span>
            </div>
          </div>
          {/* Right column */}
          <div
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "32px 30px 42px",
              height: "100%",
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 55,
                border: "2px solid #8FBE8E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 46, color: "#2F3439", fontFamily: "Great Vibes" }}>Mj</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 21, color: "#2F3439", fontWeight: 400, fontFamily: "Cormorant Garamond" }}>
                MJ Concierge Services
              </span>
              <div style={{ width: 36, height: 1, background: "#8FBE8E", opacity: 0.5, marginTop: 10, marginBottom: 10 }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "#4E545C",
                  opacity: 0.7,
                  textTransform: "uppercase" as const,
                }}
              >
                Cleaning · Chauffeurs ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "#4E545C",
                  opacity: 0.7,
                  textTransform: "uppercase" as const,
                  marginTop: 2,
                }}
              >
                Photography
              </span>
            </div>
          </div>
          {/* Dark triangle - rotated square clipped by overflow:hidden */}
          <div
            style={{
              position: "absolute",
              bottom: -35,
              right: -35,
              width: 70,
              height: 70,
              background: "#2F3439",
              transform: "rotate(45deg)",
            }}
          />
          {/* Green triangle - rotated square, smaller, on top */}
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: -30,
              width: 58,
              height: 58,
              background: "#8FBE8E",
              transform: "rotate(45deg)",
            }}
          />
          {/* Light reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.03) 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DM Sans",
          data: dmSansFont,
          weight: 400 as const,
          style: "normal" as const,
        },
        {
          name: "Cormorant Garamond",
          data: cormorantFont,
          weight: 400 as const,
          style: "normal" as const,
        },
        {
          name: "Great Vibes",
          data: greatVibesFont,
          weight: 400 as const,
          style: "normal" as const,
        },
      ],
    }
  );
}
