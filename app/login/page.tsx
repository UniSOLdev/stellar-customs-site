import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" && sp.next.startsWith("/") && !sp.next.startsWith("//") ? sp.next : "/admin";
  const errRaw = typeof sp.error === "string" ? sp.error : null;
  const err = errRaw ? decodeURIComponent(errRaw) : null;
  const errDisplay =
    errRaw === "forbidden"
      ? "This account is not set up as an owner yet. Ask the site owner to add your profile in Supabase."
      : err;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-stellar-black px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-stellar-blue/20 bg-stellar-surface/60 p-8 shadow-glow-blue/30 backdrop-blur-md">
        <h1 className="font-display text-center text-2xl font-bold text-white">Owner login</h1>
        <p className="mt-2 text-center text-sm text-zinc-400">Stellar Customs admin — big fields, simple flow.</p>

        {errDisplay ? (
          <p className="mt-6 rounded-xl border border-stellar-orange/40 bg-stellar-orange/10 px-4 py-3 text-center text-sm text-stellar-orange-soft">
            {errDisplay}
          </p>
        ) : null}

        <form action={loginAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 min-h-[52px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-white outline-none focus:border-stellar-blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 min-h-[52px] w-full rounded-xl border border-white/10 bg-stellar-black/60 px-4 py-3 text-white outline-none focus:border-stellar-blue"
            />
          </div>
          <button
            type="submit"
            className="min-h-[52px] w-full rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue text-sm font-bold uppercase tracking-widest text-black shadow-glow-button"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-500">
          <Link href="/" className="text-stellar-blue hover:underline">
            Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
