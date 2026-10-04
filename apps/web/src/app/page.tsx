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
        <span className="text-xl font-bold tracking-normal">
          Crave<span className="text-orange">Crunch</span>
        </span>
        <div className="flex items-center gap-3 text-base font-medium">
          <a href="#how" className="hidden sm:inline">How it works</a>
          <a href="#get-app" className="pressable rounded-full bg-ink px-4 py-2 text-white">Get the app</a>
        </div>
      </nav>

      <main className="flex flex-col">
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-8 md:grid-cols-2 md:items-center md:py-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-[2.5rem] font-bold leading-tight sm:text-[3.25rem] sm:leading-[4rem]">
              Find the spot that fits your craving
            </h1>
            <p className="max-w-prose text-lg font-medium text-body">
              Tell CraveCrunch your mood. It finds the small local places that fit, and locals tell you what to order.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 shadow-[0_4px_16px_rgba(0,0,0,0.16)] sm:p-6">
            <p className="text-sm font-medium text-body">What&apos;s the vibe tonight?</p>
            <div className="flex flex-wrap gap-2">
              {VIBE_TAGS.map((tag) => (
                <span
                  key={tag.id}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    SELECTED.has(tag.id) ? "bg-ink text-white" : "bg-canvas-soft text-ink"
                  }`}>
                  {tag.emoji} {tag.label}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-canvas-soft px-4 py-3 text-base">
              <span className="text-body">Budget</span>
              <span className="font-medium">$$</span>
            </div>
            <button type="button" className="pressable rounded-full bg-orange px-5 py-3 text-base font-medium text-ink">
              Crunch it 🎲
            </button>
          </div>
        </section>

        <section id="how" className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:px-8">
          <h2 className="text-[1.75rem] font-bold sm:text-4xl">Picks for 🔥 Spicy + 🌮 Street food</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {picks.map((r) => (
              <li key={r.id} className="flex flex-col gap-1 rounded-2xl bg-canvas-soft p-6">
                <span className={`text-sm font-medium ${isHiddenGem(r) ? "text-orange-ink" : "hidden md:invisible md:inline"}`}>
                  💎 Hidden gem
                </span>
                <span className="text-xl font-bold">{r.name}</span>
                <span className="text-sm text-body">
                  {r.vibes.map((v) => vibeById(v)?.emoji).join(" ")} · {r.rating} from {r.reviewCount} reviews
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-body">Sample data until real restaurants are connected.</p>
        </section>

        <section id="get-app" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold sm:text-[2rem]">Know a hole-in-the-wall spot?</h2>
            <p className="max-w-prose text-base text-white/80">
              Add it, earn the 💎 Gem Hunter badge, and help your city eat better.
            </p>
            <a href="#" className="pressable rounded-full bg-white px-5 py-3 text-base font-medium text-ink">
              Get CraveCrunch for Android and iOS
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto bg-ink px-4 py-8 text-sm text-white/70 sm:px-8">CraveCrunch</footer>
    </>
  );
}
