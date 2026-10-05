"use client";

import { normalizeUsername, validateEmail, validatePassword, validateUsername } from "@cravecrunch/core";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";

export function AuthForm({ confirmed }: { confirmed: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(confirmed ? "sign-in" : "sign-up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(confirmed ? "Your email is confirmed. Sign in to continue." : null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    const problem =
      (mode === "sign-up" && validateUsername(username)) || validateEmail(email) || validatePassword(password);
    if (problem) return setError(problem);

    setBusy(true);
    const supabase = createClient();
    try {
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) return setError(error.message);
        router.push("/");
        router.refresh();
        return;
      }

      const name = normalizeUsername(username);
      const { data: taken } = await supabase.from("profiles").select("id").eq("username", name).maybeSingle();
      if (taken) return setError("That username is taken. Try another one.");

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { username: name }, emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) return setError(error.message);
      if (data.session) {
        router.push("/");
        router.refresh();
      } else {
        setNotice(`Check ${email.trim()} for a link to confirm your account.`);
      }
    } finally {
      setBusy(false);
    }
  }

  const input = "rounded-xl bg-surface px-4 py-3 text-base outline-none ring-ink focus:ring-2";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl bg-canvas p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-2 gap-1 rounded-full bg-surface p-1 text-sm font-semibold">
        {(["sign-up", "sign-in"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`pressable rounded-full py-2 ${mode === m ? "bg-ink text-white" : "text-secondary"}`}
          >
            {m === "sign-up" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      {mode === "sign-up" && (
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Username
          <input className={input} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" placeholder="taco_hunter" />
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Email
        <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Password
        <input
          className={input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
        />
      </label>

      {error && <p role="alert" className="text-sm font-medium text-orange-ink">{error}</p>}
      {notice && <p role="status" className="rounded-xl bg-orange-tint px-4 py-3 text-sm font-medium">{notice}</p>}

      <button
        type="submit"
        disabled={busy}
        className="pressable rounded-full bg-ink px-5 py-3.5 text-base font-bold text-white disabled:opacity-60"
      >
        {busy ? "One sec…" : mode === "sign-up" ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
