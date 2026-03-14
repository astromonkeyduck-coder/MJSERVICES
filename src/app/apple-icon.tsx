import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F4EE",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #8FBE8E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 56,
              color: "#2F3439",
              fontStyle: "italic",
              fontWeight: 600,
              fontFamily: "Georgia, serif",
            }}
          >
            Mj
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
