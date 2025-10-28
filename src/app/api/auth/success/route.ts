import { syncUserProfile } from "@/lib/supabase/sync-user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.redirect(new URL("/", process.env.KINDE_SITE_URL!));
  }

  const result = await syncUserProfile({
    id: user.id,
    email: user.email || undefined,
    given_name: user.given_name || undefined,
    family_name: user.family_name || undefined,
    picture: user.picture || undefined,
  });

  if (!result.success) {
    console.error("Failed to sync user:", result.error);
  }

  return NextResponse.redirect(new URL("/", process.env.KINDE_SITE_URL!));
}
