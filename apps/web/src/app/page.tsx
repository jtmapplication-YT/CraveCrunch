import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CravePicker } from "./_crave/crave-picker";
import { CravePicks } from "./_crave/crave-picks";
import { CraveProvider } from "./_crave/crave-state";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle()
    : { data: null };

  return (
    <CraveProvider>
      <header className="bg-orange">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <span className="font-display text-2xl">CraveCrunch</span>
          <div className="flex items-center gap-3 text-base font-semibold">
            <a href="#picks" className="hidden sm:inline">Tonight&apos;s picks</a>
            {user ? (
              <form action="/auth/sign-out" method="post" className="flex items-center gap-3">
                <span className="hidden sm:inline">@{profile?.username ?? "you"}</span>
                <button type="submit" className="pressable rounded-full bg-ink px-4 py-2 text-white">Sign out</button>
              </form>
            ) : (
              <Link href="/sign-in" className="pressable rounded-full bg-ink px-4 py-2 text-white">Sign in</Link>
            )}
          </div>
        </nav>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-12 pt-6 sm:px-8 md:grid-cols-[1.15fr_1fr] md:items-center md:pb-20 md:pt-10">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.06em]">Hole-in-the-wall food finder</p>
            <h1 className="font-display text-[2.75rem] leading-[1.02] text-balance sm:text-[4.5rem]">
              What are you craving tonight?
            </h1>
            <p className="max-w-prose text-lg font-medium">
              Tell CraveCrunch your mood. It finds the small local places that fit, and locals tell you what to order.
            </p>
          </div>

          <CravePicker />
        </section>
      </header>

      <main className="flex flex-col">
        <CravePicks />

        <section id="get-app" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-white sm:p-10">
            <h2 className="text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[2.5rem]">
              Know a <span className="text-orange">hole-in-the-wall</span> spot?
            </h2>
            <p className="max-w-prose text-base text-white/80">
              Add it, earn the 💎 Gem Hunter badge, and help your city eat better.
            </p>
            <a href="#" className="pressable rounded-full bg-orange px-5 py-3 text-base font-semibold text-ink">
              Get CraveCrunch for Android and iOS
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto bg-ink py-8 text-sm text-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <span className="font-display text-xl text-white">CraveCrunch</span>
        </div>
      </footer>
    </CraveProvider>
  );
}
