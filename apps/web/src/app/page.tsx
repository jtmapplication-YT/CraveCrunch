import { SAMPLE_RESTAURANTS, VIBE_TAGS, isHiddenGem, rankForCrave, vibeById } from "@cravecrunch/core";

export default function Home() {
  const picks = rankForCrave(SAMPLE_RESTAURANTS, {
    vibes: ["spicy", "street"],
    maxPrice: 2,
    maxDistanceMiles: 5,
  }).slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-5 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.12em] text-blue">Android · iOS · Web</p>
        <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          Find the{" "}
          <span className="crave-gradient bg-clip-text text-transparent">destination</span> of your
          cravings.
        </h1>
        <p className="max-w-prose text-muted">
          Tell CraveCrunch your mood. It finds the small local spots that fit, and locals tell you what to order.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold">What&apos;s the vibe tonight?</h2>
        <div className="flex flex-wrap gap-2">
          {VIBE_TAGS.map((tag) => (
            <span key={tag.id} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
              {tag.emoji} {tag.label}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold">Example picks for 🔥 + 🌮</h2>
        <ul className="grid gap-3">
          {picks.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-4">
              {isHiddenGem(r) && <span className="text-xs font-semibold text-orange">💎 HIDDEN GEM</span>}
              <span className="font-display font-bold">{r.name}</span>
              <span className="text-sm text-muted">
                {r.vibes.map((v) => vibeById(v)?.emoji).join(" ")} · {r.rating} from {r.reviewCount} reviews
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">Sample data until real restaurants are connected.</p>
      </section>
    </main>
  );
}
