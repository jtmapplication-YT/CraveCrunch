"use client";

import {
  SAMPLE_RESTAURANTS,
  rankForCrave,
  type CraveAnswers,
  type PriceLevel,
  type Restaurant,
  type VibeTagId,
} from "@cravecrunch/core";
import { createContext, useContext, useState, type ReactNode } from "react";

export type CravePick = { restaurant: Restaurant; why?: string };

type CraveState = {
  vibes: VibeTagId[];
  maxPrice: PriceLevel;
  picks: CravePick[];
  /** Picks for these vibes, so the heading doesn't change until the next crunch. */
  pickedVibes: VibeTagId[];
  /** Bumps on each crunch so result cards replay their entrance. */
  round: number;
  loading: boolean;
  toggleVibe: (id: VibeTagId) => void;
  setMaxPrice: (price: PriceLevel) => void;
  crunch: () => Promise<void>;
};

const MAX_DISTANCE_MILES = 5;
const DEFAULT_VIBES: VibeTagId[] = ["spicy", "street"];
const byId = new Map(SAMPLE_RESTAURANTS.map((r) => [r.id, r]));

function localPicks(answers: CraveAnswers): CravePick[] {
  return rankForCrave(SAMPLE_RESTAURANTS, answers)
    .slice(0, 3)
    .map((restaurant) => ({ restaurant }));
}

const CraveContext = createContext<CraveState | null>(null);

export function useCrave() {
  const value = useContext(CraveContext);
  if (!value) throw new Error("useCrave must be used inside <CraveProvider>");
  return value;
}

/** Holds the questionnaire answers and the latest picks for the home page. */
export function CraveProvider({ children }: { children: ReactNode }) {
  const [vibes, setVibes] = useState<VibeTagId[]>(DEFAULT_VIBES);
  const [maxPrice, setMaxPrice] = useState<PriceLevel>(2);
  const [pickedVibes, setPickedVibes] = useState<VibeTagId[]>(DEFAULT_VIBES);
  const [picks, setPicks] = useState<CravePick[]>(() =>
    localPicks({ vibes: DEFAULT_VIBES, maxPrice: 2, maxDistanceMiles: MAX_DISTANCE_MILES }),
  );
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleVibe = (id: VibeTagId) =>
    setVibes((current) => (current.includes(id) ? current.filter((v) => v !== id) : [...current, id]));

  async function crunch() {
    if (vibes.length === 0 || loading) return;
    const answers: CraveAnswers = { vibes, maxPrice, maxDistanceMiles: MAX_DISTANCE_MILES };
    setLoading(true);
    let next: CravePick[] = [];
    try {
      const response = await fetch("/api/crave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (response.ok) {
        const data = (await response.json()) as {
          picks: { restaurantId: string; why: string }[];
          source: "claude" | "local";
        };
        next = data.picks.flatMap((p) => {
          const restaurant = byId.get(p.restaurantId);
          // Only Claude writes a real reason; the local ranking has nothing useful to say.
          return restaurant ? [{ restaurant, why: data.source === "claude" ? p.why : undefined }] : [];
        });
      }
    } catch {
      // Offline or the route failed: fall back to ranking in the browser.
    }
    if (next.length === 0) next = localPicks(answers);
    setPicks(next);
    setPickedVibes(vibes);
    setRound((r) => r + 1);
    setLoading(false);
    document.getElementById("picks")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <CraveContext.Provider
      value={{ vibes, maxPrice, picks, pickedVibes, round, loading, toggleVibe, setMaxPrice, crunch }}
    >
      {children}
    </CraveContext.Provider>
  );
}
