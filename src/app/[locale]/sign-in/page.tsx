import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Login from "@/components/Login/Login";
import { getTranslations } from "next-intl/server";

async function page() {
  const signInTranslation = await getTranslations("SignIn");
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return (
    <Login
      text1={signInTranslation("welcome")}
      text2={signInTranslation("login")}
      text3={signInTranslation("noAccount")}
      text4={signInTranslation("register")}
      link="/register"
      kindeMode={"login"}
    />
  );
}

export default page;
