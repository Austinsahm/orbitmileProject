import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    // await supabase.auth.getUser();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // if (
    //   !user &&
    //   !request.nextUrl.pathname.startsWith("/login") &&
    //   !request.nextUrl.pathname.startsWith("/auth")
    // ) {
    //   // no user, potentially respond by redirecting the user to the login page
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/login";
    //   return NextResponse.redirect(url);
    // }

    // if (user) {
    //   return redirect("/protected");
    // }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
