import Login from "@/components/Login/Login";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.register");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: {
      index: false,
      follow: true,
    },
  };
}

async function page() {
  const signInTranslation = await getTranslations("SignUp");

  return (
    <Login
      text1={signInTranslation("create")}
      text2={signInTranslation("createForFree")}
      text3={signInTranslation("alreadyHave")}
      text4={signInTranslation("login")}
      link="/sign-in"
      kindeMode={"register"}
    />
  );
}

export default page;
