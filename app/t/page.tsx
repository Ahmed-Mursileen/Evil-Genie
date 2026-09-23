import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Twist } from "@/components/Twist";
import { Wall } from "@/components/Wall";
import { moodLabel } from "@/lib/moods";
import { decodeShare } from "@/lib/share";

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

async function readShared(searchParams: Props["searchParams"]) {
  const { d } = await searchParams;
  const raw = typeof d === "string" ? d : undefined;
  return { raw, shared: decodeShare(raw) };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { raw, shared } = await readShared(searchParams);
  if (!shared || !raw) return { title: "Evil Genie" };
  const title = `"${shared.wish}" · Evil Genie`;
  return {
    title,
    description: shared.twist,
    openGraph: { title, description: shared.twist, images: [`/api/og?d=${raw}`] },
    twitter: { card: "summary_large_image", title, description: shared.twist, images: [`/api/og?d=${raw}`] },
  };
}

export default async function SharedTwist({ searchParams }: Props) {
  const { shared } = await readShared(searchParams);

  return (
    <Wall mood={shared?.mood === "yellow" ? "yellow" : undefined}>
      <Masthead />
      {shared ? (
        <section className="verdict" aria-labelledby="verdict-title">
          <h2 id="verdict-title" className="stamp">
            Manzoor.
          </h2>
          <Twist text={shared.twist} />
          <p className="verdict-wish">
            Kisi ne maanga: <q>{shared.wish}</q> · <span className="nowrap">Mizaj: {moodLabel(shared.mood)}</span>
          </p>
        </section>
      ) : (
        <section className="verdict">
          <h2 className="stamp">Mit gaya.</h2>
          <p className="twist">This scrawl has been washed off the wall. Or it was never there.</p>
        </section>
      )}
      <Link href="/" className="summon cta" style={{ textAlign: "center", textDecoration: "none" }}>
        Apni murad maango
      </Link>
    </Wall>
  );
}
