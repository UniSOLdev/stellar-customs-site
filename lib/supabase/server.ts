/**
 * Server Supabase client (App Router, cookies via @supabase/ssr).
 *
 * Env (set in `.env.local`):
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Storage buckets (public read URLs when bucket is public; signed URLs optional):
 * - stellar-gallery — site gallery + admin uploads
 * - stellar-products — product images
 *
 * Do not put SUPABASE_SERVICE_ROLE_KEY in client code; owner writes use session + RLS.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { authDevVerbose } from "@/lib/auth/debug";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (e) {
            /* set from Server Component — session refresh may be skipped */
            authDevVerbose("supabase/server:setAll_skipped", {
              names: cookiesToSet.map((c) => c.name),
              error: e instanceof Error ? e.message : String(e),
            });
          }
        },
      },
    }
  );
}
