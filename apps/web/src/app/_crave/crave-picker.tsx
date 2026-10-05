"use client";

import { PRICE_LEVELS, VIBE_TAGS } from "@cravecrunch/core";
import { useCrave } from "./crave-state";

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

      <div className="flex flex-col gap-2">
        <p id="budget-label" className="text-xs font-bold uppercase tracking-[0.06em] text-orange-ink">
          Budget per person
        </p>
        <div role="radiogroup" aria-labelledby="budget-label" className="grid grid-cols-4 gap-2">
          {PRICE_LEVELS.map(({ level, symbol, range }) => {
            const on = level === maxPrice;
            return (
              <button
                key={level}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={`${symbol}, ${range} per person`}
                onClick={() => setMaxPrice(level)}
                className={`pressable flex flex-col items-center rounded-full px-1 py-2 ${on ? "bg-ink text-white" : "bg-surface hover:bg-elevated"}`}
              >
                <span className="text-sm font-extrabold">{symbol}</span>
                <span className={`text-xs font-medium ${on ? "text-white/80" : "text-secondary"}`}>{range}</span>
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
