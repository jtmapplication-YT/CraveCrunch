import { describe, expect, it } from 'vitest';

import { normalizeUsername, validateEmail, validatePassword, validateUsername } from './auth';

describe('validateUsername', () => {
  it('accepts lowercase letters, numbers and underscores', () => {
    expect(validateUsername('taco_hunter204')).toBeNull();
  });

  it('normalizes case and spaces before checking', () => {
    expect(normalizeUsername('  TacoHunter ')).toBe('tacohunter');
    expect(validateUsername('  TacoHunter ')).toBeNull();
  });

  it('rejects names that are too short, too long or have symbols', () => {
    expect(validateUsername('ab')).toMatch(/at least 3/);
    expect(validateUsername('a'.repeat(21))).toMatch(/up to 20/);
    expect(validateUsername('taco-hunter')).toMatch(/letters, numbers/);
  });
});

describe('validateEmail and validatePassword', () => {
  it('checks the basic email shape', () => {
    expect(validateEmail('jt@example.com')).toBeNull();
    expect(validateEmail('jt@example')).not.toBeNull();
  });

  it('requires 8 characters', () => {
    expect(validatePassword('1234567')).not.toBeNull();
    expect(validatePassword('12345678')).toBeNull();
  });
});
