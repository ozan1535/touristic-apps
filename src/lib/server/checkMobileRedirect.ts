"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkMobileRedirect() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userAgent = await headers();
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
    userAgent.get("user-agent") ?? ""
  );

  if (!user && isMobile) {
    redirect("/sign-in");
  }

  return { user, isMobile };
}
