import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "2px solid #8FBE8E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 20,
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
