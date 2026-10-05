"use client";

import { isHiddenGem, vibeById } from "@cravecrunch/core";
import { useCrave } from "./crave-state";

/** "Tonight's picks" cards for the last crunch. */
export function CravePicks() {
  const { picks, pickedVibes, round } = useCrave();
  const emojis = pickedVibes.map((v) => vibeById(v)?.emoji).join(" + ");

  return (
    <section id="picks" className="mx-auto flex w-full max-w-6xl scroll-mt-4 flex-col gap-5 px-4 py-12 sm:px-8">
      <h2 className="text-[1.75rem] font-extrabold leading-tight sm:text-[2.5rem]">
        Tonight&apos;s picks for {emojis}
      </h2>
      {picks.length === 0 ? (
        <p className="rounded-2xl bg-surface p-6 text-base text-secondary">
          Nothing fits that budget yet. Try one more $ or a different vibe.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-3">
          {picks.map(({ restaurant: r, why }, i) => (
            <li
              key={`${round}-${r.id}`}
              style={{ animationDelay: `${i * 50}ms` }}
              className="fade-up flex flex-col gap-1 rounded-r-2xl rounded-l-sm border-l-4 border-orange bg-surface p-6"
            >
              <span className={`text-sm font-semibold ${isHiddenGem(r) ? "text-orange-ink" : "text-secondary"}`}>
                {isHiddenGem(r) ? "💎 Hidden gem" : "Local favorite"}
              </span>
              <span className="font-display text-[1.75rem] leading-tight">{r.name}</span>
              <span className="text-sm text-secondary">
                {r.vibes.map((v) => vibeById(v)?.emoji).join(" ")} · {r.rating} from {r.reviewCount} reviews
              </span>
              {why && <span className="mt-1 text-sm font-medium">{why}</span>}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted">Sample data until real restaurants are connected.</p>
    </section>
  );
}
