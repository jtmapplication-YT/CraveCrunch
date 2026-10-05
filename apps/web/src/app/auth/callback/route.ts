import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * The confirmation email links here. The email is already confirmed by the time we arrive;
 * exchanging the code also signs the person in when they signed up in this browser.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/`);
  }
  // Signed up in the app or another browser: the email is confirmed, so ask them to sign in.
  return NextResponse.redirect(`${origin}/sign-in?confirmed=1`);
}
