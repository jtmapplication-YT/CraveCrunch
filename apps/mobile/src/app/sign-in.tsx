import { router } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  REMEMBERED_EMAIL_KEY,
  colors,
  normalizeUsername,
  radii,
  validateEmail,
  validatePassword,
  validateUsername,
} from '@cravecrunch/core';

import { PressScale } from '@/components/press-scale';
import { fonts } from '@/constants/fonts';
import { supabase } from '@/lib/supabase';

type Mode = 'sign-up' | 'sign-in';

// localStorage here is the on-device store installed by '@/lib/supabase' (expo-sqlite).
function readRememberedEmail(): string | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(REMEMBERED_EMAIL_KEY);
  } catch {
    return null;
  }
}

export default function SignIn() {
  const [savedEmail] = useState(readRememberedEmail);
  // Returning people with a remembered email start on Sign in.
  const [mode, setMode] = useState<Mode>(savedEmail ? 'sign-in' : 'sign-up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(savedEmail ?? '');
  const [remember, setRemember] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function rememberEmail(value: string) {
    try {
      if (remember) localStorage.setItem(REMEMBERED_EMAIL_KEY, value);
      else localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    } catch {
      // Storage unavailable: nothing to remember.
    }
  }

  async function submit() {
    setError(null);
    setNotice(null);
    const problem =
      (mode === 'sign-up' && validateUsername(username)) || validateEmail(email) || validatePassword(password);
    if (problem) return setError(problem);

    setBusy(true);
    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) return setError(error.message);
        rememberEmail(email.trim());
        return router.back();
      }

      const name = normalizeUsername(username);
      const { data: taken } = await supabase.from('profiles').select('id').eq('username', name).maybeSingle();
      if (taken) return setError('That username is taken. Try another one.');

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { username: name } },
      });
      if (error) return setError(error.message);
      rememberEmail(email.trim());
      if (data.session) return router.back();
      setNotice(`Check ${email.trim()} for a link to confirm your account, then sign in here.`);
      setMode('sign-in');
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.band}>
          <Text style={styles.title}>Your table is waiting</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.tabs}>
            {(['sign-up', 'sign-in'] as const).map((m) => (
              <View key={m} style={styles.flex}>
                <PressScale
                  onPress={() => {
                    setMode(m);
                    setError(null);
                  }}>
                  <View style={[styles.tab, mode === m && styles.tabOn]}>
                    <Text style={[styles.tabText, mode === m && styles.tabTextOn]}>
                      {m === 'sign-up' ? 'Create account' : 'Sign in'}
                    </Text>
                  </View>
                </PressScale>
              </View>
            ))}
          </View>

          {mode === 'sign-up' && (
            <Field
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="taco_hunter"
              autoComplete="nickname"
              textContentType="nickname"
            />
          )}
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            // The email is the login name, so the phone's password manager saves it with the password.
            autoComplete="username"
            textContentType="username"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            textContentType={mode === 'sign-up' ? 'newPassword' : 'password'}
          />

          <Pressable
            style={styles.remember}
            onPress={() => setRemember((r) => !r)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}>
            <View style={[styles.checkbox, remember && styles.checkboxOn]}>
              {remember && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>Remember me</Text>
          </Pressable>

          {error && <Text style={styles.error}>{error}</Text>}
          {notice && <Text style={styles.notice}>{notice}</Text>}

          <PressScale disabled={busy} onPress={submit}>
            <View style={[styles.cta, busy && styles.ctaBusy]}>
              <Text style={styles.ctaText}>
                {busy ? 'One sec…' : mode === 'sign-up' ? 'Create account' : 'Sign in'}
              </Text>
            </View>
          </PressScale>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, ...props }: { label: string } & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  page: { paddingBottom: 32 },
  band: { backgroundColor: colors.orange, paddingHorizontal: 16, paddingBottom: 24 },
  title: { color: colors.ink, fontSize: 36, lineHeight: 42, fontFamily: fonts.display },
  body: { padding: 16, gap: 14 },
  tabs: { flexDirection: 'row', gap: 4, padding: 4, borderRadius: radii.pill, backgroundColor: colors.surface },
  tab: { borderRadius: radii.pill, paddingVertical: 9, alignItems: 'center' },
  tabOn: { backgroundColor: colors.ink },
  tabText: { color: colors.textSecondary, fontSize: 14, fontFamily: fonts.semibold },
  tabTextOn: { color: colors.onBrand },
  field: { gap: 6 },
  label: { color: colors.ink, fontSize: 14, fontFamily: fonts.medium },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.ink,
  },
  remember: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start', paddingVertical: 4 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.ink },
  checkmark: { color: colors.onBrand, fontSize: 14, fontFamily: fonts.bold, lineHeight: 16 },
  error: { color: colors.orangeInk, fontSize: 14, fontFamily: fonts.medium },
  notice: {
    backgroundColor: colors.orangeTint,
    borderRadius: radii.md,
    padding: 14,
    color: colors.ink,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  cta: {
    marginTop: 8,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.ink,
  },
  ctaBusy: { opacity: 0.6 },
  ctaText: { color: colors.onBrand, fontSize: 16, fontFamily: fonts.bold },
});
