// Write-only log of every wish to Supabase. The site never reads it back.
// The anon key can only INSERT (see supabase/schema.sql), so it's safe even if leaked.
export type WishLogRow = { wish: string; mood: string; twist: string | null; flagged: boolean };

export async function logWish(row: WishLogRow): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/wishes`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) console.error("wish log failed", res.status, await res.text());
  } catch (err) {
    console.error("wish log failed", err);
  }
}
