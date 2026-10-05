/** Sign-up rules shared by the website and the app. Each returns an error message, or null when valid. */

export const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;
export const MIN_PASSWORD_LENGTH = 8;

/** Lowercases and trims, since usernames are stored lowercase. */
export function normalizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

export function validateUsername(input: string): string | null {
  const username = normalizeUsername(input);
  if (username.length < 3) return 'Usernames need at least 3 characters.';
  if (username.length > 20) return 'Usernames can be up to 20 characters.';
  if (!USERNAME_PATTERN.test(username)) return 'Use only letters, numbers and underscores.';
  return null;
}

export function validateEmail(input: string): string | null {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim()) ? null : 'Enter a valid email address.';
}

export function validatePassword(input: string): string | null {
  return input.length >= MIN_PASSWORD_LENGTH ? null : `Passwords need at least ${MIN_PASSWORD_LENGTH} characters.`;
}
