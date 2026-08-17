import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Eduarda Santos — Marketing Estratégico";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const WINE = "#3B0F1A";
const CREAM = "#F3EFE6";

/**
 * OG image gerada em build/request (não um PNG estático) para reaproveitar
 * o lockup real da marca: mesmo monograma do footer, mesma composição
 * (monograma → "EDUARDA SANTOS" tracked → "MARKETING ESTRATÉGICO"), em
 * Montserrat — a única fonte que o footer usa nesse lockup, não Bodoni.
 */
export default async function Image() {
  const [montserrat, monogram] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og/montserrat-300.ttf")),
    readFile(join(process.cwd(), "src/assets/og/monogram-cream.png")),
  ]);
  const monogramSrc = `data:image/png;base64,${monogram.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: WINE,
        fontFamily: "Montserrat",
      }}
    >
      <img src={monogramSrc} width={140} height={205} alt="" />

      <div
        style={{
          marginTop: 40,
          fontSize: 42,
          fontWeight: 300,
          color: CREAM,
          letterSpacing: 12,
          display: "flex",
        }}
      >
        EDUARDA SANTOS
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: 9999,
            backgroundColor: "rgba(243,239,230,0.6)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 19,
            fontWeight: 300,
            color: "rgba(243,239,230,0.6)",
            letterSpacing: 5,
            display: "flex",
          }}
        >
          MARKETING ESTRATÉGICO
        </div>
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: 9999,
            backgroundColor: "rgba(243,239,230,0.6)",
            display: "flex",
          }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserrat, weight: 300, style: "normal" },
      ],
    },
  );
}
