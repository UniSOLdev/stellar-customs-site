import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { authDevLog, authDevVerbose } from "@/lib/auth/debug";

export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    authDevLog("middleware:skip_missing_env", { hasUrl: Boolean(url), hasKey: Boolean(key) });
    return NextResponse.next({ request });
  }

  const pathname = request.nextUrl.pathname;
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");
  const isAdmin = pathname.startsWith("/admin");

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        /* NextRequest cookie API in Next 15 does not accept Supabase's options tuple; mirror refreshed cookies on the outgoing response only. */
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          if (options && typeof options === "object") {
            supabaseResponse.cookies.set(name, value, options as never);
          } else {
            supabaseResponse.cookies.set(name, value);
          }
        });
      },
    },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  authDevVerbose("middleware:getUser", {
    pathname,
    userId: user?.id ?? null,
    userError: userError?.message ?? null,
  });

  if (isAdmin && !user) {
    authDevLog("middleware:redirect_login", { reason: "admin_no_user", pathname });
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLogin && user) {
    authDevVerbose("middleware:login_has_session", { userId: user.id });
  }

  return supabaseResponse;
}
