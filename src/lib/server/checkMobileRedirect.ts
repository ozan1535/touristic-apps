"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkMobileRedirect() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userAgent = headers().get("user-agent") ?? "";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);

  if (!user && isMobile) {
    redirect("/sign-in");
  }

  return { user, isMobile };
}
