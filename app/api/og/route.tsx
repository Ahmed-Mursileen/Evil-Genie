import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { decodeShare } from "@/lib/share";

const fontDir = join(process.cwd(), "assets/fonts");
// The spray face is subset to the letters this card uses.
const fonts = Promise.all([
  readFile(join(fontDir, "RubikSprayPaint-og.ttf")),
  readFile(join(fontDir, "BarlowCondensed-Medium.ttf")),
  readFile(join(fontDir, "BarlowCondensed-Bold.ttf")),
]);

// Plaster cracks for the card, drawn as tapered slivers like on the site.
function cracks(color: string) {
  const crack =
    "M200 18 L184 24 L176 42 L159 50 L153 72 L139 83 L128 110 L141 86 L156 76 L162 54 L179 47 L187 28 L200 23 Z M176 44 L187 57 L185 73 L190 57 Z";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><g fill="${color}"><g transform="translate(1000 40) scale(1)"><path d="${crack}"/></g><g transform="translate(200 380) scale(-1 1)"><path d="${crack}"/></g><g transform="translate(1010 470) rotate(8)"><path d="${crack}"/></g></g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function GET(req: Request) {
  const shared = decodeShare(new URL(req.url).searchParams.get("d"));
  const yellow = shared?.mood === "yellow";
  const c = yellow
    ? { wall: "#0d0c07", hi: "#1c190b", crack: "#000000", title: "#e3c62b", shade: "#6b5a06", gold: "#f4e27a", bone: "#efe8c4", dim: "#b9ae76" }
    : { wall: "#15101d", hi: "#231a2f", crack: "#08060c", title: "#a472ff", shade: "#9a6108", gold: "#f2b632", bone: "#efe6d8", dim: "#b8abc9" };

  const twist = shared?.twist ?? "Write your wish on the wall. It will be granted. Qeemat baad mein.";
  const twistSize = twist.length > 200 ? 40 : twist.length > 120 ? 48 : 58;
  const wish = shared && (shared.wish.length > 80 ? shared.wish.slice(0, 78) + "…" : shared.wish);
  const [spray, medium, bold] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: `radial-gradient(circle at 14% 10%, ${c.hi}, ${c.wall} 58%)`,
          color: c.bone,
          fontFamily: "Barlow",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cracks(c.crack)} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
        <div
          style={{ position: "absolute", top: 250, left: -30, display: "flex", fontFamily: "Spray", fontSize: 150, color: c.bone, opacity: 0.06, transform: "rotate(-4deg)" }}
        >
          Kala jadu ka tor
        </div>
        <div
          style={{ position: "absolute", top: 470, left: 260, display: "flex", fontFamily: "Spray", fontSize: 120, color: c.title, opacity: 0.08, transform: "rotate(3deg)" }}
        >
          24 ghante
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", fontFamily: "Spray", fontSize: 92, color: c.title, textShadow: `4px 5px 0 ${c.shade}` }}
            >
              Evil Genie
            </div>
            <div style={{ display: "flex", fontFamily: "Spray", fontSize: 36, color: c.gold, marginBottom: 14 }}>
              Har murad poori
            </div>
          </div>
          {shared ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontFamily: "Spray",
                fontSize: 66,
                color: c.gold,
                transform: "rotate(-3deg)",
                textShadow: `3px 4px 0 ${c.shade}`,
              }}
            >
              Manzoor.
            </div>
          ) : null}
          <div style={{ display: "flex", marginTop: 14, fontSize: twistSize, fontWeight: 700, lineHeight: 1.12 }}>{twist}</div>
          {wish ? <div style={{ display: "flex", marginTop: 22, fontSize: 32, color: c.dim }}>{`Khwahish thi: “${wish}”`}</div> : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Spray", data: spray, weight: 400, style: "normal" },
        { name: "Barlow", data: medium, weight: 500, style: "normal" },
        { name: "Barlow", data: bold, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
