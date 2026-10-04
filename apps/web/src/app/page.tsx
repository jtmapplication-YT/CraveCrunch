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
      <header className="bg-orange">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <span className="font-display text-2xl font-black tracking-[0.02em]">CraveCrunch</span>
          <div className="flex items-center gap-3 text-base font-semibold">
            <a href="#how" className="hidden sm:inline">How it works</a>
            <a href="#get-app" className="pressable rounded-full bg-ink px-4 py-2 text-white">Get the app</a>
          </div>
        </nav>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-12 pt-6 sm:px-8 md:grid-cols-[1.15fr_1fr] md:items-center md:pb-20 md:pt-10">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.06em]">Hole-in-the-wall food finder</p>
            <h1 className="font-display text-[3.5rem] font-black leading-[0.9] text-balance sm:text-[6rem]">
              What are you craving tonight?
            </h1>
            <p className="max-w-prose text-lg font-medium">
              Tell CraveCrunch your mood. It finds the small local places that fit, and locals tell you what to order.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.06em] text-orange-ink">Pick your vibe</p>
            <div className="flex flex-wrap gap-2">
              {VIBE_TAGS.map((tag) => (
                <span
                  key={tag.id}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium ${SELECTED.has(tag.id) ? "bg-ink text-white" : "bg-surface"}`}
                >
                  {tag.emoji} {tag.label}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-base">
              <span className="text-secondary">Budget</span>
              <span className="font-display text-xl font-black">$$</span>
            </div>
            <button type="button" className="pressable font-display rounded-full bg-ink px-5 py-3 text-xl font-black tracking-[0.04em] text-white">
              Crunch it 🎲
            </button>
          </div>
        </section>
      </header>

      <main className="flex flex-col">
        <section id="how" className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-12 sm:px-8">
          <h2 className="font-display text-[2.5rem] font-black leading-[0.95] sm:text-[3.5rem]">
            Tonight&apos;s picks for 🔥 + 🌮
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {picks.map((r) => (
              <li key={r.id} className="flex flex-col gap-1 rounded-r-2xl rounded-l-sm border-l-4 border-orange bg-surface p-6">
                <span className={`text-sm font-semibold ${isHiddenGem(r) ? "text-orange-ink" : "text-secondary"}`}>
                  {isHiddenGem(r) ? "💎 Hidden gem" : "Local favorite"}
                </span>
                <span className="font-display text-3xl font-black leading-none tracking-[0.01em]">{r.name}</span>
                <span className="text-sm text-secondary">
                  {r.vibes.map((v) => vibeById(v)?.emoji).join(" ")} · {r.rating} from {r.reviewCount} reviews
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">Sample data until real restaurants are connected.</p>
        </section>

        <section id="get-app" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-white sm:p-10">
            <h2 className="font-display text-[2.5rem] font-black leading-[0.95] sm:text-[3.5rem]">
              Know a <span className="text-orange">hole-in-the-wall</span> spot?
            </h2>
            <p className="max-w-prose text-base text-white/80">
              Add it, earn the 💎 Gem Hunter badge, and help your city eat better.
            </p>
            <a href="#" className="pressable rounded-full bg-orange px-5 py-3 text-base font-semibold text-ink">
              Get CraveCrunch for Android and iOS
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto bg-ink py-8 text-sm text-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <span className="font-display text-xl font-black text-white">CraveCrunch</span>
        </div>
      </footer>
    </>
  );
}
