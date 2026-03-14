import { ImageResponse } from "next/og";
import { company } from "@/content/site-data";

export const runtime = "edge";
export const alt = "MJ Concierge Services - Cleaning, Private Chauffeurs & Photography in Orlando, FL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage(request: Request) {
  let baseUrl: string = company.url;
  try {
    const reqUrl = new URL(request.url);
    if (reqUrl.origin?.startsWith("http")) baseUrl = reqUrl.origin;
  } catch {
    // fallback to company.url
  }
  const bgImageUrl = `${baseUrl}/images/cherrr3.JPG`;

  let bgImageSrc: string;
  try {
    const res = await fetch(bgImageUrl);
    if (!res.ok) throw new Error("Fetch failed");
    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    bgImageSrc = `data:image/jpeg;base64,${btoa(binary)}`;
  } catch {
    bgImageSrc = "";
  }

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
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Background: cherrr3.JPG */}
        {bgImageSrc ? (
          <img
            src={bgImageSrc}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #2F3439 0%, #1E2328 100%)",
              zIndex: 0,
            }}
          />
        )}

        {/* Dark overlay for contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)",
            zIndex: 1,
          }}
        />

        {/* 3D-style Business card overlay (tilted, floating) */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 700,
              height: 400,
              background: "#F7F4EE",
              borderRadius: 20,
              display: "flex",
              border: "2px solid rgba(143,190,142,0.5)",
              boxShadow:
                "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.08), 0 0 60px rgba(143,190,142,0.15)",
              overflow: "hidden",
              position: "relative",
              transform: "rotate(-4deg)",
              transformOrigin: "center center",
            }}
          >
            {/* Left: contact info */}
            <div
              style={{
                flex: 1,
                padding: "32px 28px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 32, color: "#2F3439", fontWeight: 400, lineHeight: 1.1 }}>
                  Marcel Joseph
                </span>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    color: "#4E545C",
                    marginTop: 6,
                    textTransform: "uppercase",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  CEO & Co-Founder
                </span>
                <div style={{ width: 45, height: 3, background: "#8FBE8E", marginTop: 10, borderRadius: 2 }} />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 14,
                  color: "#4E545C",
                }}
              >
                <span>{company.contact.phone1}</span>
                <span>{company.contact.phone2}</span>
                <span>{company.contact.email}</span>
                <span style={{ fontSize: 13 }}>{company.location.full}</span>
              </div>
            </div>

            {/* Right: brand */}
            <div
              style={{
                width: "42%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "32px 32px 44px",
              }}
            >
              {/* Monogram circle */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "2px solid #8FBE8E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 42,
                    color: "#2F3439",
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  Mj
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: 20, color: "#2F3439", fontWeight: 400 }}>
                  MJ Concierge Services
                </span>
                <div style={{ width: 36, height: 1, background: "#8FBE8E", opacity: 0.5, marginTop: 8, marginBottom: 8 }} />
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "#4E545C",
                    opacity: 0.6,
                    textTransform: "uppercase",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  Cleaning · Chauffeurs · Photography
                </span>
              </div>
            </div>

            {/* Corner accent */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 0,
                height: 0,
                borderBottom: "52px solid #8FBE8E",
                borderLeft: "52px solid transparent",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
