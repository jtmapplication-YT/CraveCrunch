import type { VibeTagId } from './types';

export interface VibeTag {
  id: VibeTagId;
  emoji: string;
  label: string;
}

/** The shared emoji vibe set. App, site and AI prompts all use these ids. */
export const VIBE_TAGS: readonly VibeTag[] = [
  { id: 'spicy', emoji: '🔥', label: 'Spicy' },
  { id: 'cozy', emoji: '🍜', label: 'Cozy' },
  { id: 'street', emoji: '🌮', label: 'Street food' },
  { id: 'date-night', emoji: '🍷', label: 'Date night' },
  { id: 'light', emoji: '🥗', label: 'Light' },
  { id: 'big-group', emoji: '🎉', label: 'Big group' },
  { id: 'late-night', emoji: '🌙', label: 'Late night' },
  { id: 'sweet', emoji: '🍩', label: 'Sweet tooth' },
  { id: 'drinks', emoji: '🍹', label: 'Drinks' },
  { id: 'healthy', emoji: '💪', label: 'Healthy' },
];

export function vibeById(id: VibeTagId): VibeTag | undefined {
  return VIBE_TAGS.find((tag) => tag.id === id);
}
