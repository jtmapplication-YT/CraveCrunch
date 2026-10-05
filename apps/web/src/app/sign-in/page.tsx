import Link from "next/link";
import { AuthForm } from "./auth-form";

export const metadata = { title: "Sign in · CraveCrunch" };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const { confirmed } = await searchParams;

  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-orange">
        <nav className="mx-auto flex w-full max-w-6xl items-center px-4 py-4 sm:px-8">
          <Link href="/" className="font-display text-2xl">
            CraveCrunch
          </Link>
        </nav>
        <div className="mx-auto w-full max-w-md px-4 pb-24 pt-4">
          <h1 className="font-display text-[2.5rem] leading-[1.05]">Your table is waiting</h1>
        </div>
      </header>
      <div className="mx-auto -mt-16 w-full max-w-md px-4 pb-16">
        <AuthForm confirmed={confirmed === "1"} />
      </div>
    </main>
  );
}
