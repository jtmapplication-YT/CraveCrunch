import { SAMPLE_RESTAURANTS, VIBE_TAGS, isHiddenGem, rankForCrave, vibeById } from "@cravecrunch/core";

const SELECTED = new Set(["spicy", "street"]);

export default function Home() {
  const picks = rankForCrave(SAMPLE_RESTAURANTS, {
    vibes: ["spicy", "street"],
    maxPrice: 2,
    maxDistanceMiles: 5,
  }).slice(0, 3);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="font-display text-lg font-black tracking-tight">CRAVECRUNCH</span>
        <div className="flex items-center gap-3 text-base font-medium">
          <a href="#how" className="hidden sm:inline">How it works</a>
          <a href="#get-app" className="pressable rounded-full bg-ink px-4 py-2 text-white">Get the app</a>
        </div>
      </nav>

      <main className="flex flex-col">
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-8 md:grid-cols-[1.15fr_1fr] md:items-center md:py-16">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-[0.06em] text-orange-ink">Hole-in-the-wall food finder</p>
            <h1 className="font-display text-[2.6rem] font-black leading-[0.98] tracking-[-0.03em] text-balance sm:text-[4rem]">
              What are you <span className="highlight">craving</span> tonight?
            </h1>
            <p className="max-w-prose text-lg font-medium text-secondary">
              Tell CraveCrunch your mood. It finds the small local places that fit, and locals tell you what to order.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-border-subtle sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.06em] text-orange-ink">Pick your vibe</p>
            <div className="flex flex-wrap gap-2">
              {VIBE_TAGS.map((tag) =>
                SELECTED.has(tag.id) ? (
                  <span key={tag.id} className="sticker rounded-full border-[1.5px] border-ink bg-ink px-3.5 py-2 text-sm font-semibold text-white">
                    {tag.emoji} {tag.label}
                  </span>
                ) : (
                  <span key={tag.id} className="rounded-full border-[1.5px] border-ink bg-canvas px-3.5 py-2 text-sm font-semibold">
                    {tag.emoji} {tag.label}
                  </span>
                ),
              )}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-base">
              <span className="text-secondary">Budget</span>
              <span className="font-display font-extrabold">$$</span>
            </div>
            <button type="button" className="pressable font-display rounded-full bg-orange-strong px-5 py-3.5 text-base font-extrabold text-white active:bg-orange-ink">
              Crunch it 🎲
            </button>
          </div>
        </section>

        <section id="how" className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-10 sm:px-8">
          <h2 className="font-display text-[1.75rem] font-black leading-tight tracking-[-0.02em] sm:text-[2.5rem]">
            Tonight&apos;s picks for 🔥 + 🌮
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {picks.map((r, i) => (
              <li key={r.id} className="flex flex-col gap-1.5 rounded-2xl bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isHiddenGem(r) ? "text-orange-ink" : "text-secondary"}`}>
                    {isHiddenGem(r) ? "💎 Hidden gem" : "Local favorite"}
                  </span>
                  <span className="font-display text-2xl font-black text-orange tabular-nums">0{i + 1}</span>
                </div>
                <span className="font-display text-xl font-extrabold tracking-[-0.01em]">{r.name}</span>
                <span className="text-sm text-secondary">
                  {r.vibes.map((v) => vibeById(v)?.emoji).join(" ")} · {r.rating} from {r.reviewCount} reviews
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">Sample data until real restaurants are connected.</p>
        </section>

        <section id="get-app" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-white sm:p-10">
            <h2 className="font-display text-[1.75rem] font-black leading-tight tracking-[-0.02em] sm:text-[2.5rem]">
              Know a <span className="highlight">hole-in-the-wall</span> spot?
            </h2>
            <p className="max-w-prose text-base text-white/80">
              Add it, earn the 💎 Gem Hunter badge, and help your city eat better.
            </p>
            <a href="#" className="pressable rounded-full bg-white px-5 py-3 text-base font-semibold text-ink">
              Get CraveCrunch for Android and iOS
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto bg-ink px-4 py-8 text-sm text-white/70 sm:px-8">
        <span className="font-display font-black text-white">CRAVECRUNCH</span>
      </footer>
    </>
  );
}
