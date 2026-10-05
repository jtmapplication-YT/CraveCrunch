"use client";

import { VIBE_TAGS, type PriceLevel } from "@cravecrunch/core";
import { useCrave } from "./crave-state";

const PRICES: PriceLevel[] = [1, 2, 3, 4];

/** The vibe + budget card on the orange band. */
export function CravePicker() {
  const { vibes, maxPrice, loading, toggleVibe, setMaxPrice, crunch } = useCrave();
  const ready = vibes.length > 0;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.06em] text-orange-ink">Pick your vibe</p>
      <div className="flex flex-wrap gap-2">
        {VIBE_TAGS.map((tag) => {
          const on = vibes.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggleVibe(tag.id)}
              className={`pressable rounded-full px-3.5 py-2 text-sm font-medium ${on ? "bg-ink text-white" : "bg-surface hover:bg-elevated"}`}
            >
              {tag.emoji} {tag.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-surface px-4 py-2">
        <span id="budget-label" className="text-base text-secondary">Budget</span>
        <div role="radiogroup" aria-labelledby="budget-label" className="flex gap-1">
          {PRICES.map((p) => {
            const on = p === maxPrice;
            return (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={`Up to ${"$".repeat(p)}`}
                onClick={() => setMaxPrice(p)}
                className={`pressable rounded-full px-3 py-1.5 text-sm font-extrabold ${on ? "bg-ink text-white" : "hover:bg-elevated"}`}
              >
                {"$".repeat(p)}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={crunch}
        disabled={!ready || loading}
        className="pressable rounded-full bg-ink px-5 py-3.5 text-base font-bold text-white disabled:bg-elevated disabled:text-muted"
      >
        {loading ? "Crunching…" : ready ? "Crunch it 🎲" : "Pick a vibe first"}
      </button>
    </div>
  );
}
