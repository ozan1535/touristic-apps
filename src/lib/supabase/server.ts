import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const createClient = async () => {
  const cookieStore = await cookies();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let token: string;

  if (user?.id) {
    token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.SUPABASE_JWT_SECRET!
    );
  } else {
    token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Ignore - called from Server Component
          }
        },
      },
    }
  );
};
