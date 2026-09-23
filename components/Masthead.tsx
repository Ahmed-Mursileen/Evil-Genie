import { Lamp } from "./Lamp";

export function Masthead({ waking = false }: { waking?: boolean }) {
  return (
    <header>
      <p className="urdu" lang="ur">
        ہر مراد پوری
      </p>
      <div className="title-row">
        <h1 className="title">Evil Genie</h1>
        <Lamp waking={waking} />
      </div>
      <p className="tagline">
        Har murad poori. <em>Qeemat baad mein.</em>
      </p>
    </header>
  );
}
